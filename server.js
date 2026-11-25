const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA = path.join(__dirname, 'data', 'records.json');
app.use(express.json({limit:'100kb'}));
app.use(express.static(path.join(__dirname, 'public')));
function load(){ try{return JSON.parse(fs.readFileSync(DATA,'utf8'));}catch{return [];} }
function save(rows){ fs.mkdirSync(path.dirname(DATA),{recursive:true}); fs.writeFileSync(DATA,JSON.stringify(rows,null,2)); }
const validRegions=['Lagos','Ogun','Oyo','FCT','Rivers','Kano','Kaduna','Enugu','Other'];
const validResults=['Resistant','Intermediate','Susceptible'];
app.get('/api/records',(req,res)=>res.json(load()));
app.post('/api/records',(req,res)=>{
 const {facility,region,organism,antibiotic,result,month}=req.body||{};
 if(!facility||!region||!organism||!antibiotic||!result||!month) return res.status(400).json({error:'Please complete all fields.'});
 if(!validRegions.includes(region)||!validResults.includes(result))return res.status(400).json({error:'Invalid region or result.'});
 const row={id:Date.now().toString(),facility:String(facility).trim().slice(0,100),region,organism:String(organism).trim().slice(0,100),antibiotic:String(antibiotic).trim().slice(0,100),result,month};
 const rows=load(); rows.unshift(row); save(rows); res.status(201).json(row);
});
app.get('/api/analysis',(_,res)=>{
 const rows=load(), groups={};
 rows.forEach(r=>{const k=`${r.region}|${r.organism}|${r.antibiotic}`;(groups[k]??=[]).push(r);});
 const flagged=Object.entries(groups).map(([k,g])=>{const resistant=g.filter(x=>x.result==='Resistant').length;return {key:k,count:g.length,resistant,rate:Math.round(100*resistant/g.length)};}).filter(g=>g.count>=3&&g.rate>=50).sort((a,b)=>b.rate-a.rate);
 res.json({total:rows.length,resistant:rows.filter(r=>r.result==='Resistant').length,regions:[...new Set(rows.map(r=>r.region))].length,flagged});
});
app.get('/api/health',(_,res)=>res.json({status:'ok'}));
app.listen(PORT,()=>console.log(`AMR Watch Nigeria running on http://localhost:${PORT}`));
