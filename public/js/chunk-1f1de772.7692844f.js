(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f1de772"],{"23e4":function(t,e,a){"use strict";a("b4d4")},"24aa":function(t,e,a){t.exports=a.p+"img/mycash.d3b2f433.svg"},"3d07":function(t,e,a){t.exports=a.p+"img/icon.b3d8c27c.png"},"6fe4":function(t,e,a){},"82a8":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{background:"#45818eff",height:"80%"}},[a("link",{attrs:{rel:"stylesheet",type:"text/css",href:"//fonts.googleapis.com/css?family=Lobster"}}),t.start?a("div",{staticClass:"fullCenter pa-10",staticStyle:{height:"100%"}},[a("v-row",[a("v-col",{attrs:{cols:"9",lg:"8",md:"8",sm:"8"}},[a("div",{staticClass:"fullCenter flexcolum"},[a("img",{attrs:{height:"150px",width:"150px",src:t.myIcon}}),a("h1",{staticClass:"specialFont"},[t._v("MB. CASHBOX")]),a("span",[t._v("Organiza el dinero de tu negocio")]),a("span",[t._v("Organise your business cash")])])]),a("v-col",[a("center",[a("v-card",{staticClass:"fullCenter flexcolum circular",staticStyle:{border:"solid black 3px"},attrs:{color:"#ffab40ff"}},[a("h1",[t._v("Bienvenido")]),a("v-btn",{staticClass:"ma-10",attrs:{rounded:"",color:"red",elevation:"10","x-large":""},on:{click:function(e){t.start=!1}}},[a("h1",[t._v("Acceder")])])],1)],1)],1)],1)],1):a("div",{staticStyle:{overflow:"scroll",height:"80vh"}},[a("center",[a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("movAdd",{attrs:{propForm:t.form},on:{propMethod:t.actionComponents}})],1),a("div",[a("v-row",[a("v-col",{attrs:{cols:"4",lg:"4",md:"4",sm:"4"}}),a("v-col",{attrs:{cols:"4",lg:"4",md:"4",sm:"4"}},[a("img",{staticClass:"img",attrs:{height:"80px",width:"80px",src:t.myIcon}}),a("h2",{staticClass:"specialFont"},[t._v("MB. CASHBOX")]),a("span",[t._v("Organiza el dinero de tu negocio")]),a("br"),a("span",[t._v("Organise your business cash")])]),a("v-col",{attrs:{cols:"4",lg:"4",md:"4",sm:"4"}},[a("cashModel",{attrs:{propCash:t.cash}})],1)],1),a("movTable",{staticClass:"ma-2",attrs:{propHeaders:t.headers,propItems:t.items},on:{propMethod:t.actionComponents}})],1)],1),a("br")],1)])},r=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-6",attrs:{width:"70%"}},[a("v-card-title",{staticClass:"pa-1"},[t._v(" Movimientos ")]),a("v-card-title",{staticClass:"pa-1"},[a("v-btn",{attrs:{color:"blue",dark:"",left:""},on:{click:function(e){return t.$emit("propMethod","openDialog",null)}}},[a("v-icon",[t._v("mdi-plus")]),t._v(" NUEVO ")],1),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Buscar","single-line":"","hide-details":"",clearable:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{attrs:{search:t.search,headers:t.propHeaders,items:t.propItems,page:t.page,"items-per-page":"5","hide-default-footer":""},on:{"update:page":function(e){t.page=e},"page-count":function(e){t.pageCount=e}},scopedSlots:t._u([{key:"item.type",fn:function(e){var o=e.item;return[a("v-chip",{attrs:{color:t.getColor(o.type),dark:""}},[t._v(" "+t._s(t.typeList[o.type])+" ")])]}},{key:"item.active",fn:function(e){var o=e.item;return[a("v-checkbox",{on:{change:function(e){return t.$emit("propMethod","changeActive",o,e)}},model:{value:o.active,callback:function(e){t.$set(o,"active",e)},expression:"item.active"}})]}}])}),a("v-pagination",{attrs:{length:t.pageCount},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)},i=[],c={components:{},props:{propHeaders:{type:Object},propItems:{type:Array}},data(){return{cashColor:"#00ff003a",start:!0,btnDisable:!1,dialog:!1,typeList:["Ingreso","Retiro"],form:{topic:"",dolar:0,cent:0},search:"",page:1,pageCount:0,cash:0,headers:[{text:"Tipo",align:"start",value:"type"},{text:"Asunto",value:"topic"},{text:"Valor",value:"value"},{text:"Fecha",value:"date"},{text:"Total",value:"total"},{text:"Activo",value:"active",sortable:!1}],items:[]}},mounted(){this.$route&&(this.route=this.$route.query.redirect)},created(){},computed:{},methods:{getColor(t){return 0==t?"green":"red"}}},l=c,n=(a("23e4"),a("2877")),p=Object(n["a"])(l,s,i,!1,null,"419fd272",null),u=p.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-5"},[a("v-card-title",[a("v-icon",{attrs:{color:"blue","x-large":""}},[t._v("mdi-plus-circle")]),a("span",{staticClass:"text-h5 ml-3"},[t._v("Nuevo movimiento")])],1),a("v-card-text",[a("v-container",[a("v-combobox",{attrs:{items:t.typeList,filled:"",outlined:"",solo:""},model:{value:t.propForm.type,callback:function(e){t.$set(t.propForm,"type",e)},expression:"propForm.type"}}),""!=t.propForm.type?a("v-row",[a("v-col",{attrs:{cols:"12",lg:"12",md:"12",sm:"12"}},[a("v-text-field",{attrs:{label:"Asunto",placeholder:"Escriba un asunto",outlined:""},model:{value:t.propForm.topic,callback:function(e){t.$set(t.propForm,"topic",e)},expression:"propForm.topic"}})],1),a("v-col",{attrs:{cols:"6",lg:"6",md:"6",sm:"6"}},[a("v-text-field",{attrs:{label:"Dolar",type:"number",placeholder:"Escriba un valor",outlined:"",min:"0",max:"99"},model:{value:t.propForm.dolar,callback:function(e){t.$set(t.propForm,"dolar",e)},expression:"propForm.dolar"}})],1),a("v-col",{attrs:{cols:"6",lg:"6",md:"6",sm:"6"}},[a("v-text-field",{attrs:{label:"Centavos",type:"number",min:"0",max:"99",placeholder:"Escriba un valor",outlined:""},model:{value:t.propForm.cent,callback:function(e){t.$set(t.propForm,"cent",e)},expression:"propForm.cent"}})],1)],1):t._e()],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.$emit("propMethod","closeDialog",null)}}},[t._v(" Cancelar ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return t.preSave()}}},[t._v(" Guardar ")])],1)],1)},h=[],m={components:{},props:{propForm:{type:Object}},data(){return{btnDisable:!1,typeList:["Ingreso","Retiro"],search:"",page:1,pageCount:0,cash:0}},mounted(){this.$route&&(this.route=this.$route.query.redirect)},created(){},computed:{},watch:{},methods:{preSave(){if(this.validate(this.propForm.type,2)&&this.validate(this.propForm.topic,4)){var t=new Date,e={type:this.typeList.indexOf(this.propForm.type),topic:this.propForm.topic,date:t.getDay()+"/"+t.getMonth()+"/"+t.getFullYear()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds(),value:this.propForm.dolar+"."+(this.propForm.cent<10?"0"+this.propForm.cent:this.propForm.cent),active:!0};this.$emit("propMethod","saveItem",e)}},validate(t,e){return!(!t||t.length<e)}}},v=m,f=(a("c29e"),Object(n["a"])(v,d,h,!1,null,"23665dee",null)),g=f.exports,b=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"fullCenter img ma-5 circular",style:{backgroundColor:t.propCash>=0?"#00ff003a":"#ff00003a",width:"30vh",height:"10vh",float:"right",border:"solid green 2px"}},[o("v-img",{staticClass:"fullCenter",staticStyle:{height:"100%"},attrs:{src:a("24aa"),alt:""}},[o("h2",{staticStyle:{color:"white"}},[o("b",[o("em",[t._v("$ "+t._s(t.propCash))])])])])],1)},x=[],y={components:{},props:{propCash:{type:String}},data(){return{}},mounted(){this.$route&&(this.route=this.$route.query.redirect)},created(){},computed:{},watch:{},methods:{}},C=y,k=(a("f385"),Object(n["a"])(C,b,x,!1,null,"e241c9a4",null)),F=k.exports,_={components:{movAdd:g,movTable:u,cashModel:F},data(){return{myIcon:a("3d07"),cashImg:a("24aa"),cashColor:"#00ff003a",start:!0,dialog:!1,form:{topic:"",dolar:0,cent:0},cash:0,headers:[{text:"Tipo",align:"start",value:"type"},{text:"Asunto",value:"topic"},{text:"Valor",value:"value"},{text:"Fecha",value:"date"},{text:"Total",value:"total"},{text:"Activo",value:"active",sortable:!1}],items:[]}},mounted(){this.$route&&(this.route=this.$route.query.redirect),this.cashUpdate()},created(){},computed:{},watch:{items(){this.cashUpdate()}},methods:{cashUpdate(){this.cash=0,this.items.forEach(t=>{1==t.active&&(console.log(parseFloat(t.value)),0==t.type?this.cash+=parseFloat(t.value):this.cash-=parseFloat(t.value))});var t=this.cash.toString(),e=t.split(".");e[1]&&(this.cash=e[0]+"."+e[1][0],e[1][1]?this.cash+=e[1][1]:this.cash+="0")},getColor(t){return 0==t?"green":"red"},continuar(){},actionComponents(t,e,a){switch(t){case"openDialog":this.form={topic:"",dolar:0,cent:0},this.dialog=!0;break;case"closeDialog":this.dialog=!1;break;case"saveItem":this.items.push(e),this.dialog=!1;break;case"changeActive":var o=this.items.indexOf(e);this.items[o].active=a,this.cashUpdate();break;default:break}}}},$=_,w=(a("87bc"),Object(n["a"])($,o,r,!1,null,"3812e334",null));e["default"]=w.exports},"87bc":function(t,e,a){"use strict";a("ff9f")},"8e1a":function(t,e,a){},b4d4:function(t,e,a){},c29e:function(t,e,a){"use strict";a("8e1a")},f385:function(t,e,a){"use strict";a("6fe4")},ff9f:function(t,e,a){}}]);
//# sourceMappingURL=chunk-1f1de772.7692844f.js.map