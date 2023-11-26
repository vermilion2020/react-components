(()=>{var e={};e.id=820,e.ids=[820,888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5232:e=>{e.exports={appHeader:"layout_appHeader__NlOun",appFooter:"layout_appFooter__K05iu",appContainer:"layout_appContainer__me_hl",footerContainer:"layout_footerContainer__Os3sM",rsschool:"layout_rsschool__Tkor_",copyright:"layout_copyright__smVi_",github:"layout_github__wS60E",imagesLink:"layout_imagesLink__92j1x"}},2412:e=>{e.exports={searchContainer:"search_searchContainer__GexVp",content:"search_content__YbXc8",button:"search_button__7_5_s",disabled:"search_disabled__UMNz2",searchInput:"search_searchInput__8mLIE",searchBarSection:"search_searchBarSection__sUi2H",searchForm:"search_searchForm__SmtRl",fallbackContainer:"search_fallbackContainer__w7nn4",fallbackImg:"search_fallbackImg__q1DVG",itemsStatMessage:"search_itemsStatMessage__fwNCS",searchResultsSection:"search_searchResultsSection__2QYKE",noItemsMessage:"search_noItemsMessage___p9QY",cardItems:"search_cardItems__LFvNt",preloader:"search_preloader__9rhlG",preloaderImg:"search_preloaderImg__7Xo73"}},4258:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>m,default:()=>A,getServerSideProps:()=>g,getStaticPaths:()=>p,getStaticProps:()=>h,reportWebVitals:()=>_,routeModule:()=>P,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>S,unstable_getStaticParams:()=>y,unstable_getStaticPaths:()=>x,unstable_getStaticProps:()=>f});var s=r(7093),l=r(5244),n=r(1323),o=r(9209),c=r.n(o),i=r(5913),u=r(6908),d=e([i]);i=(d.then?(await d)():d)[0];let A=(0,n.l)(u,"default"),h=(0,n.l)(u,"getStaticProps"),p=(0,n.l)(u,"getStaticPaths"),g=(0,n.l)(u,"getServerSideProps"),m=(0,n.l)(u,"config"),_=(0,n.l)(u,"reportWebVitals"),f=(0,n.l)(u,"unstable_getStaticProps"),x=(0,n.l)(u,"unstable_getStaticPaths"),y=(0,n.l)(u,"unstable_getStaticParams"),b=(0,n.l)(u,"unstable_getServerProps"),S=(0,n.l)(u,"unstable_getServerSideProps"),P=new s.PagesRouteModule({definition:{kind:l.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:i.default,Document:c()},userland:u});a()}catch(e){a(e)}})},7687:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{P:()=>o});var s=r(9648),l=r(4512),n=e([s]);async function o(e,t=1,r=0){let a={page:t,per_page:80};e&&(a.beer_name=e),a.page=t;let n=await s.default.get(l.CT,{params:a}),c=n.data,i=r+c.length;return 0!==c.length?(t++,await o(e,t,i)):i}s=(n.then?(await n)():n)[0],a()}catch(e){a(e)}})},5873:(e,t,r)=>{"use strict";r.d(t,{Z:()=>c});var a=r(997),s=r(1664),l=r.n(s);r(6689);var n=r(5232),o=r.n(n);function c({children:e}){return(0,a.jsxs)("div",{className:o().appContainer,children:[a.jsx("header",{className:o().appHeader,children:a.jsx("h1",{children:a.jsx(l(),{href:"/",children:"React. Next.JS/SSR/SSG"})})}),e,a.jsx("footer",{className:o().appFooter,children:(0,a.jsxs)("div",{className:o().footerContainer,children:[(0,a.jsxs)("p",{className:o().copyright,children:[a.jsx("a",{href:"https://github.com/vermilion2020",className:o().github,target:"_blank",rel:"noreferrer",children:"vermilion2020"})," ","2023"]}),(0,a.jsxs)("p",{className:o().copyright,children:[a.jsx("a",{href:"https://punkapi.com/",className:o().github,target:"_blank",rel:"noreferrer",children:"PUNK API"})," "]}),a.jsx("a",{href:"https://rs.school/react/",target:"_blank",rel:"noreferrer",children:(0,a.jsxs)("svg",{className:o().rsschool,version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"242",height:"90",viewBox:"0 0 242 90",children:[a.jsx("title",{children:"rss"}),a.jsx("path",{fill:"#7d0ed7",d:"M137.197 3.257c-6.927 1.609-10.367 5.259-10.401 11.036-0.039 6.727 3.729 9.816 15.812 12.966 5.873 1.53 7.869 4.182 5.091 6.758-3.153 2.922-9.323 1.027-10.1-3.105-0.385-2.062-0.366-2.056-6.837-1.696l-5.735 0.318 0.276 1.806c0.425 2.784 2.722 7.082 4.68 8.758 5.802 4.964 21.78 4.455 27.25-0.872l1.6-1.558 0.307 1.811c1.125 6.663 7.892 12.923 15.677 14.504l2.5 0.509-1.477 1.935c-4.874 6.384-5.012 19.44-0.276 26.221 7.248 10.375 27.644 10.074 34.355-0.506l1.249-1.969v9.391h31.61v-10.097h-18.878v-29.416h-12.732l-0.025 4.5c-0.022 3.676-0.121 4.343-0.548 3.642-2.419-3.968-7.13-7.265-11.748-8.218l-2.489-0.515 2.526-1.898c7.858-5.906 12.752-16.681 11.495-25.307-3.305-22.669-35.958-23.020-48.395-0.523-0.802 1.448-1.485 2.68-1.519 2.737s-1.153-0.956-2.489-2.247c-2.77-2.683-4.995-3.665-12.558-5.538-7.037-1.744-8.477-2.967-6.112-5.192 2.25-2.115 7.149-0.745 8.252 2.309 0.647 1.789 0.529 1.772 8.010 1.277l4.326-0.287-0.276-1.724c-1.277-7.987-11.329-12.386-22.424-9.807zM2.635 23.268v19.755h12.732v-15.806h1.294c2.042 0 3.277 1.502 7.214 8.781l3.682 6.803 7.079 0.121c3.893 0.067 7.076 0.003 7.076-0.141 0-2.225-7.934-15.064-10.136-16.402l-1.207-0.734 2.436-1.274c9.031-4.728 7.321-18.273-2.576-20.396-1.249-0.267-7.574-0.467-14.884-0.467h-12.71v19.755zM195.401 6.952c19.87 5.186 18.051 33.064-2.824 43.242-21.268 10.37-40.222-6.654-30.113-27.045 5.898-11.897 20.984-19.316 32.934-16.194zM24.14 12.417c4.472 2.261 1.505 6.435-4.829 6.795l-3.943 0.225v-7.585l3.842 0.006c2.199 0.003 4.306 0.242 4.93 0.557zM188.373 15.91c-3.496 0.928-7.051 4.461-7.054 7.009-0.006 4.163 3.322 5.664 8.558 3.862 3.203-1.102 4.019-1.102 4.612 0.003 1.004 1.879-2.287 3.794-4.207 2.447-0.965-0.675-4.523 1.454-4.559 2.728-0.056 1.918 4.798 2.644 7.771 1.162 9.442-4.705 6.761-14.805-3.032-11.427-3.915 1.35-4.756 1.409-4.756 0.323 0-1.704 2.663-2.936 3.825-1.775 0.475 0.475 4.075-1.912 4.075-2.703 0-1.181-3.189-2.177-5.237-1.631zM174.201 25.383c-2.095 1.516-2.194 1.122 1.648 6.576 2.365 3.355 3.274 5.012 3.184 5.797-0.157 1.342-1.662 1.699-2.72 0.644-0.672-0.672-0.847-0.619-2.438 0.745-4.019 3.443 2.090 6.398 6.629 3.209 4.987-3.504 4.995-5.678 0.037-12.918-3.845-5.617-4.022-5.729-6.342-4.050zM13.044 49.621c-7.183 1.133-11.388 5.333-11.444 11.43-0.056 6.221 3.977 9.765 13.967 12.265 6.123 1.533 8.139 2.703 8.139 4.719 0 5.678-10.164 5.11-11.239-0.627-0.377-2.002-0.329-1.991-6.812-1.64l-5.749 0.312 0.287 1.8c1.311 8.252 6.109 11.686 16.799 12.021 8.477 0.264 11.391-0.557 15.092-4.258l2.534-2.534 0.931 1.257c5.386 7.284 23.58 7.774 29.554 0.793 1.747-2.039 3.707-5.881 3.907-7.65 0.141-1.246 0.101-1.268-5.223-2.883l-5.363-1.628-0.72 2.166c-2.453 7.383-11.714 7.467-13.748 0.127-0.692-2.495-0.608-8.454 0.157-11.022 1.845-6.207 9.638-7.481 12.8-2.090 1.319 2.25 0.965 2.208 6.95 0.855 5.698-1.288 5.453-1.060 4.154-3.859-5.153-11.087-22.475-13.688-31.66-4.759l-2.562 2.492-1.063-1.814c-2.649-4.523-11.005-6.846-19.682-5.473zM134.342 49.632c-4.863 0.844-9.667 3.904-12.381 7.883-0.726 1.066-0.745 0.979-0.768-3.187l-0.023-4.281h-12.732v13.61h-12.732v-13.61h-12.732v39.513h12.732v-15.806h12.732v15.806h12.732v-8.933l1.375 2.073c5.721 8.634 23.414 10.15 31.466 2.694 9.318-8.626 7.49-28.249-3.136-33.671-4.101-2.093-11.298-3.004-16.535-2.095zM20.183 57.727c0.734 0.38 1.595 1.409 2.062 2.467l0.802 1.817 8.578-0.413-0.281 2.239c-0.371 2.962-0.537 3.074-2.998 1.986-1.159-0.512-4.402-1.505-7.211-2.211-6.646-1.665-7.473-2.022-7.813-3.375-0.63-2.503 3.766-4.112 6.865-2.509zM141.871 59.279c6.502 1.806 7.819 16.729 1.789 20.278-4.503 2.649-10.201 0.394-11.537-4.57-2.655-9.863 2.264-17.786 9.748-15.708zM194.951 59.268c7.554 2.098 7.4 19.074-0.191 21.119-6.103 1.642-10.164-2.599-10.133-10.581 0.034-8.294 3.963-12.305 10.325-10.536z"})]})})]})})]})}},5562:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var a=r(6689),s=r.n(a);class l extends s().Component{constructor(e){super(e),this.state={hasError:!1}}static getDerivedStateFromError(e){return console.log(e),{hasError:!0}}render(){let{hasError:e}=this.state,{fallback:t,children:r}=this.props;return e?t:r}}let n=l},663:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var a=r(997);r(6689);let s={src:"/_next/static/media/fallback.1e6b5acd.jpg",height:394,width:598,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAoAAEBAAAAAAAAAAAAAAAAAAAABgEBAQAAAAAAAAAAAAAAAAAAAgP/2gAMAwEAAhADEAAAAKcCn//EABwQAAEEAwEAAAAAAAAAAAAAAAECAxIhABETMf/aAAgBAQABPwAsKSzz7rg4DNNEGVavzP/EABYRAQEBAAAAAAAAAAAAAAAAAAEAMf/aAAgBAgEBPwAB2//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Af//Z",blurWidth:8,blurHeight:5};var l=r(5675),n=r.n(l),o=r(2412),c=r.n(o);let i=function(){return(0,a.jsxs)("div",{className:c().fallbackContainer,children:[a.jsx(n(),{width:300,height:200,className:c().fallbackImg,src:s,alt:"Something went wrong"}),a.jsx("h2",{children:"Oops, an error occur..."}),a.jsx("p",{children:"Run away from an error!"}),a.jsx("button",{className:c().button,onClick:()=>{window.location.href="/"},children:"Open Home page"})]})}},4512:(e,t,r)=>{"use strict";r.d(t,{CT:()=>a,Kp:()=>s,aQ:()=>l,kC:()=>n,vc:()=>o});let a="https://api.punkapi.com/v2/beers/",s=1,l=20,n=[20,40,60,80],o="No items found for the current search term and paging settings"},6908:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return Error}});let a=r(167),s=a._(r(6689)),l=a._(r(9201)),n={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function o(e){let{res:t,err:r}=e,a=t&&t.statusCode?t.statusCode:r?r.statusCode:404;return{statusCode:a}}let c={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class Error extends s.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||n[e]||"An unexpected error has occurred";return s.default.createElement("div",{style:c.error},s.default.createElement(l.default,null,s.default.createElement("title",null,e?e+": "+r:"Application error: a client-side exception has occurred")),s.default.createElement("div",{style:c.desc},s.default.createElement("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?s.default.createElement("h1",{className:"next-error-h1",style:c.h1},e):null,s.default.createElement("div",{style:c.wrap},s.default.createElement("h2",{style:c.h2},this.props.title||e?r:s.default.createElement(s.default.Fragment,null,"Application error: a client-side exception has occurred (see the browser console for more information)"),"."))))}}Error.displayName="ErrorPage",Error.getInitialProps=o,Error.origGetInitialProps=o,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5913:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{App:()=>u,default:()=>d});var s=r(997);r(6689);var l=r(5873);r(9605);var n=r(6789),o=r(663),c=r(5562),i=e([n]);function u({Component:e,pageProps:t}){return s.jsx(l.Z,{children:s.jsx(c.Z,{fallback:s.jsx(o.Z,{}),children:s.jsx(e,{...t})})})}n=(i.then?(await i)():i)[0];let d=n.YS.withRedux(u);a()}catch(e){a(e)}})},7609:(e,t,r)=>{"use strict";r.d(t,{DE:()=>i,Fl:()=>c,OK:()=>d,qF:()=>o,zk:()=>u});var a=r(4335),s=r(4512),l=r(481),n=r(5648);let o=(0,a.createApi)({reducerPath:"itemsApi",baseQuery:(0,a.fetchBaseQuery)({baseUrl:s.CT}),tagTypes:["Item"],extractRehydrationInfo(e,{reducerPath:t}){if(e.type===n.HYDRATE)return e.payload[t]},endpoints:e=>({getItemsList:e.query({query:({page:e,per_page:t,beer_name:r})=>{let a={page:e,per_page:t};return a.beer_name=r&&r.length?r:" ",{url:"",method:"GET",params:a}}}),getItem:e.query({query:e=>({url:`${e}`,method:"GET"}),async onQueryStarted(e,{dispatch:t,queryFulfilled:r}){try{t(l.K4(!0));let{data:e}=await r;t(l.LS(e[0])),t(l.sT(null)),t(l.K4(!1))}catch(e){t(l.K4(!1)),t(l.sT(e.error.data))}}})})}),{useGetItemsListQuery:c,useGetItemQuery:i,util:{getRunningQueriesThunk:u}}=o,{getItemsList:d,getItem:A}=o.endpoints},481:(e,t,r)=>{"use strict";r.d(t,{K4:()=>n,LS:()=>c,ZP:()=>l,sT:()=>o});var a=r(5184);let s=(0,a.createSlice)({initialState:{loading:!1,error:null,item:null},name:"detailSlice",reducers:{setItem:(e,t)=>{e.item=t.payload},setLoading:(e,t)=>{e.loading=t.payload},setError:(e,t)=>{e.error=t.payload}}}),l=s.reducer,{setLoading:n,setError:o,setItem:c}=s.actions},682:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{Cl:()=>p,LT:()=>m,YA:()=>_,YZ:()=>c,Yp:()=>g,ZP:()=>d,sT:()=>h});var s=r(5184),l=r(4512),n=r(7687),o=e([n]);n=(o.then?(await o)():o)[0];let c=(0,s.createAsyncThunk)("getCountItems",e=>(0,n.P)(e)),i={loading:!1,error:null,countItems:0,perPage:l.aQ,page:l.Kp,searchTerm:"",details:0},u=(0,s.createSlice)({initialState:i,name:"searchSlice",reducers:{setLoading:(e,t)=>{e.loading=t.payload},setError:(e,t)=>{e.error=t.payload},setSearchTerm:(e,t)=>{e.searchTerm=t.payload},setPerPage:(e,t)=>{e.perPage=t.payload},setPage:(e,t)=>{e.page=t.payload},setDetails:(e,t)=>{e.details=t.payload}},extraReducers:e=>{e.addCase(c.fulfilled,(e,t)=>{e.countItems=t.payload})}}),d=u.reducer,{setLoading:A,setError:h,setSearchTerm:p,setPerPage:g,setDetails:m,setPage:_}=u.actions;a()}catch(e){a(e)}})},6789:(e,t,r)=>{"use strict";r.a(e,async(e,a)=>{try{r.d(t,{CG:()=>h,YS:()=>A});var s=r(5184),l=r(6022),n=r(7609),o=r(682),c=r(481),i=r(5648),u=e([o]);o=(u.then?(await u)():u)[0];let d=(0,s.combineReducers)({[n.qF.reducerPath]:n.qF.reducer,searchState:o.ZP,detailState:c.ZP}),A=(0,i.createWrapper)(function(){return(0,s.configureStore)({reducer:d,middleware:e=>e({}).concat([n.qF.middleware])})},{debug:!0}),h=l.useSelector;a()}catch(e){a(e)}})},9605:()=>{},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},5184:e=>{"use strict";e.exports=require("@reduxjs/toolkit")},4335:e=>{"use strict";e.exports=require("@reduxjs/toolkit/query/react")},5648:e=>{"use strict";e.exports=require("next-redux-wrapper")},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},6405:e=>{"use strict";e.exports=require("react-dom")},6022:e=>{"use strict";e.exports=require("react-redux")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},9648:e=>{"use strict";e.exports=import("axios")},1017:e=>{"use strict";e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[556,61,209],()=>r(4258));module.exports=a})();