import{h as i,p as g}from"../.pnpm/.pnpm.b2939809.js";import{c as e}from"../../assets/index.04b0ada7.js";const o=i("tags",{state:()=>({tags:[],activeTag:""}),persist:{enabled:!0,strategies:[{storage:localStorage,paths:["tags","activeTag"]}]},getters:{isEmpty(){return this.tags.length===0}},actions:{setActiveTag(t){this.activeTag=t},setTags(t){this.tags=g(t)},addTag(t){this.setActiveTag(t.path),!(["/404","/login","/system/user","/system/setting"].includes(t.path)||this.tags.some(s=>s.path===t.path))&&this.setTags([...this.tags,t])},removeTag(t){if(t===this.activeTag){const s=this.tags.findIndex(a=>a.path===t);s>0?e.push(this.tags[s-1].path):e.push(this.tags[s+1].path)}this.setTags(this.tags.filter(s=>s.path!==t))}}});export{o as u};
