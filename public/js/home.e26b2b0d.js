(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"124d":function(t,e,i){t.exports=i.p+"img/adminSystem.0b43a41a.jpg"},"1a9f":function(t,e,i){t.exports=i.p+"img/transporte.ab28d508.jpg"},"326e":function(t,e,i){"use strict";i("a476")},"36c5":function(t,e,i){t.exports=i.p+"img/hogar.aa995105.jpg"},"3fce":function(t,e,i){t.exports=i.p+"img/moba.026abde7.svg"},"4d0e":function(t,e,i){},"50b6":function(t,e,i){t.exports=i.p+"img/stock.588ac535.jpg"},"713c":function(t,e,i){t.exports=i.p+"img/tecnologia.96f92930.jpg"},"746b":function(t,e,i){},8338:function(t,e,i){t.exports=i.p+"img/produccion.13d43f1d.jpg"},"92bd":function(t,e,i){t.exports=i.p+"img/moba.7ba03e62.png"},"973b":function(t,e,i){},"9e73":function(t,e,i){"use strict";i("746b")},a476:function(t,e,i){},aa69:function(t,e,i){"use strict";i("4d0e")},bb51:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"startView"},[i("v-dialog",{attrs:{persistent:""},model:{value:t.showMision,callback:function(e){t.showMision=e},expression:"showMision"}},[i("sideLeft",{staticClass:"col1 pa-2",attrs:{propClass:"windowsxLB"},on:{method:t.closeMision}})],1),i("v-row",{staticStyle:{height:"100%",padding:"30px"}},[i("v-col",{staticClass:"col1 mediaPc windowsHA",attrs:{cols:"12",lg:"3",md:"3",sm:"0"}},[i("center",[i("sideLeft")],1)],1),i("v-col",{staticClass:"col2 windowsHA",attrs:{cols:"12",lg:"9",md:"12",sm:"12"}},[i("sideRight",{attrs:{propItems:t.items}})],1)],1),i("br")],1)},o=[],s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"mediaPhone"},[i("v-btn",{attrs:{fab:"",color:"secondary","x-small":""},on:{click:function(e){return t.$emit("method")}}},[i("v-icon",[t._v("mdi-close")])],1)],1),i("center",[i("img",{staticClass:"exagono",attrs:{src:t.moba}})]),i("div",{staticClass:"windowsHB",staticStyle:{"overflow-y":"auto","overflow-x":"hidden"}},[i("hr",{staticStyle:{"margin-bottom":"20px"}}),t._l(t.info,(function(e,a){return i("p",{key:"line"+a,staticClass:"textInfo"},[t._v(" "+t._s(e.line)+" ")])}))],2)],1)},n=[],c={data(){return{moba:i("3fce"),info:[{line:"MOBA TECHNOLOGY es una empresa dedicada a la creación de sistemas administrativos, plataformas, sitios webs, aplicaciones móviles tanto educativas y para negocios."},{line:"Al mismo tiempo tiene a disponibilidad su centro de educación tecnológico para capacitar a niños y jóvenes en las nuevas tendencias tecnológicas: estudiantes y personas interesadas en aprender sobre las Tecnologías de Información y Comunicación (TICs), programación, robótica educativa, ofimática, etc."}]}},methods:{btnPlay(t){this.$emit("search",t)}}},l=c,r=(i("ce92"),i("2877")),d=Object(r["a"])(l,s,n,!1,null,null,null),p=d.exports,m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"95%"}},[i("h4",{staticStyle:{color:"white"}},[t._v("Seleccione el tipo de servicio requerido")]),i("br"),i("v-row",[i("v-col",{staticClass:"textPhone windowsHC",staticStyle:{"overflow-y":"auto","overflow-x":"hidden"},attrs:{cols:"12",lg:"7",md:"12",sm:"12"}},t._l(t.propItems,(function(e){return i("div",{key:e.title,on:{mouseenter:function(i){t.selected=e},click:function(i){return t.btnVisit(e.path)}}},[i("itemCard",{attrs:{propItem:e},on:{method:t.btnVisit}})],1)})),0),i("v-col",{staticClass:"mediaPc",attrs:{cols:"5",lg:"5",md:"5",sm:"5"}},[i("infoCard",{attrs:{propSelected:t.selected},on:{method:t.btnVisit}})],1)],1),i("br")],1)},u=[],b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("center",{staticClass:"cardModel"},[i("br"),i("h3",[t._v(t._s(t.propSelected.title))]),i("br"),i("div",{staticClass:"infoImg",style:{backgroundImage:"url("+t.propSelected.img+")"},attrs:{alt:t.propSelected.title}}),i("br"),i("span",{staticStyle:{justify:"left"}},[t._v(t._s(t.propSelected.info))]),i("br"),i("br"),i("v-btn",{attrs:{color:"blue"},on:{click:function(e){return t.$emit("method",t.propSelected.path)}}},[t._v("ENTRAR")])],1)},f=[],h={props:{propSelected:{type:Object}},data(){return{}},methods:{}},g=h,v=(i("aa69"),Object(r["a"])(g,b,f,!1,null,null,null)),y=v.exports,w=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"divItem"},[i("div",{staticStyle:{width:"100px",height:"100px",float:"left"},attrs:{id:"imgItemThis"}},[t.propItem.img?i("div",{staticClass:"divItemImg",style:{backgroundImage:"url("+t.propItem.img+")"},attrs:{alt:t.propItem.by}}):i("div",{staticClass:"divItemImg"},[i("center",[i("span",{staticClass:"white--text text-h5"},[t._v(t._s(t.propItem.title[0].toUpperCase()+t.propItem.title[1].toUpperCase()+t.propItem.title[2].toUpperCase()))])])],1),i("center",{staticClass:"ma-1"},[i("h2",{staticStyle:{justify:"left"}},[t._v(t._s(t.propItem.avalible.toUpperCase()))])])],1),i("div",[i("div",{staticClass:"mediaPc"},[i("v-card-title",[t._v(" "+t._s(t.propItem.title)+" ")])],1),i("h2",{staticClass:"mediaPhone"},[t._v(" "+t._s(t.propItem.title)+" ")]),i("div",[i("span",{staticStyle:{justify:"left"}},[t._v(t._s(t.propItem.info))])])])])},C=[],x={props:{propItem:{type:Object}},data(){return{}},methods:{}},_=x,I=(i("9e73"),Object(r["a"])(_,w,C,!1,null,null,null)),j=I.exports,S={components:{infoCard:y,itemCard:j},props:{propItems:{type:Array}},data(){return{selected:{}}},methods:{btnPlay(t){this.$emit("search",t)},btnVisit(t){this.$router.push({name:t})}}},E=S,k=(i("ff75"),Object(r["a"])(E,m,u,!1,null,null,null)),M=k.exports,L={components:{sideLeft:p,sideRight:M},name:"home",data(){return{showMision:!1,infoCard:{active:!1,title:"",data:null,news:!0,business:!1,login:!1},dialog:{},searchText:"",imgMoba:i("92bd"),selected:{},items:[{img:i("50b6"),title:"Venta de productos",avalible:"Ecuador",by:"moba",info:"Conoce nuestro stock a buenos precios y al por mayor.",ubication:"Ecuador-El Oro-Machala",path:"Productos"},{img:i("124d"),title:"Sistemas Administrativos",avalible:"Disponible",by:"moba",info:"Brindamos capacitación tecnología en  el uso de herramientas de gestión y administración.",ubication:"Ecuador-El Oro-Machala",path:"Sistemas"},{img:i("e0f2"),title:"Plataformas y sitios web",avalible:"Disponible",by:"moba",info:"Brindamos servicios de desarrollo para que tengas tu propia página web administrativa y publicista.",ubication:"Ecuador-El Oro-Machala",path:"Plataformas"},{img:i("36c5"),title:"Aplicaciones móviles",avalible:"Disponible",by:"moba",info:"Desarrollamos aplicaciones móviles a la medida de tu necesidad.",ubication:"Ecuador-Azuay-Cuenca",path:"Aplicaciones"},{img:i("1a9f"),title:"Capacitación Tecnológica",avalible:"Disponible",by:"moba",info:"Brindamos capacitación tecnológica en  el uso de herramientas de gestión y administración.",ubication:"Ecuador-Loja-Loja",path:"Capacitacion"},{img:i("e0f2"),title:"Marketing publicitario",avalible:"Disponible",by:"moba",info:"Con la publicidad tu negocio podrá tener un mayor alcance de clientela y maximizar tus ventas.",ubication:"Ecuador-Loja-Loja",path:"Marketing"},{img:i("8338"),title:"Equipos informáticos",avalible:"Disponible",by:"moba",info:"Cotizamos equipos informáticos con la garantía de brindarte el equipo adecuado para tu negocio.",ubication:"Ecuador-Loja-Loja",path:"Equipos"},{img:i("713c"),title:"Mantenimiento y soporte técnico.",avalible:"Disponible",by:"moba",info:"Realizamos servicios de mantenimiento y reparación de diversos tipos de equipos y componentes tecnológicos.",ubication:"Ecuador-Loja-Loja",path:"Mantenimiento"}]}},mounted(){window.screen.width<800&&(this.showMision=!0),this.$route&&(this.route=this.$route.query.redirect)},created(){this.$func.openDialog=this.openDialog,this.openDialog("news",{name:"dfdf"})},computed:{},methods:{close(){this.dialog.active=!1,this.dialog.news=!1,this.dialog.business=!1,this.dialog.login=!1},search(t){this.searchText=t},closeMision(){this.showMision=!1},openDialog(t,e){switch(this.dialog.data=e,this.close(),t){case"news":this.dialog.title="Noticias",this.dialog.news=!0;break;case"business":this.dialog.title="Negocios",this.dialog.business=!0;break;case"login":this.dialog.title="Ingresar / Iniciar Sesión",this.dialog.login=!0;break;default:break}this.dialog.active=!0}}},O=L,$=(i("326e"),Object(r["a"])(O,a,o,!1,null,"11b5d958",null));e["default"]=$.exports},ce92:function(t,e,i){"use strict";i("973b")},e0f2:function(t,e,i){t.exports=i.p+"img/educacion.ce8cea94.jpg"},efa3:function(t,e,i){},ff75:function(t,e,i){"use strict";i("efa3")}}]);
//# sourceMappingURL=home.e26b2b0d.js.map