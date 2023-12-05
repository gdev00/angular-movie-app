"use strict";(self.webpackChunkangular_movie_app=self.webpackChunkangular_movie_app||[]).push([[508],{9508:(Q,h,n)=>{n.r(h),n.d(h,{MoreInfoComponent:()=>J});var c=n(6814),t=n(5879),u=n(2296),p=n(617),r=n(696),T=n(3785),x=n(6593);function Z(i,s){1&i&&t._UZ(0,"iframe",5),2&i&&t.Q6J("src",s.ngIf,t.uOi)}let L=(()=>{class i{constructor(e,o,a){this.dialogRef=e,this.data=o,this.sanitizer=a}get movieTrailerSrc(){return this.sanitizer.bypassSecurityTrustResourceUrl(T.v.convertYoutubeLinkToEmbededURL(this.data?.url))}close(){this.dialogRef.close()}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(r.so),t.Y36(r.WI),t.Y36(x.H7))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-movie-trailer-modal"]],standalone:!0,features:[t.jDz],decls:8,vars:4,consts:[["mat-dialog-title","",1,"bg-black","!p-0","!relative"],["mat-icon-button","",1,"!absolute","!right-0",3,"click"],[1,"!text-white"],[1,"bg-gray-600","!p-0"],["width","560","height","315","frameborder","0","webkitallowfullscreen","","mozallowfullscreen","","allowfullscreen","",3,"src",4,"ngIf"],["width","560","height","315","frameborder","0","webkitallowfullscreen","","mozallowfullscreen","","allowfullscreen","",3,"src"]],template:function(o,a){1&o&&(t.TgZ(0,"div",0)(1,"button",1),t.NdJ("click",function(){return a.close()}),t.TgZ(2,"mat-icon",2),t._uU(3,"close"),t.qZA()()(),t.TgZ(4,"mat-dialog-content",3),t._uU(5),t.ALo(6,"json"),t.YNc(7,Z,1,1,"iframe",4),t.qZA()),2&o&&(t.xp6(5),t.hij(" ",t.lcZ(6,2,a.data)," "),t.xp6(2),t.Q6J("ngIf",a.movieTrailerSrc))},dependencies:[c.ez,c.O5,c.Ts,r.Is,r.uh,r.xY,u.ot,u.RK,p.Ps,p.Hw],changeDetection:0})}return i})();var g=n(3259);function A(i,s){if(1&i&&(t.TgZ(0,"p")(1,"span",20),t._uU(2),t.qZA(),t.TgZ(3,"span",21),t._uU(4),t.qZA()()),2&i){const e=s.ngIf;t.xp6(2),t.hij("",null==e?null:e[0]," / "),t.xp6(2),t.Oqu(null==e?null:e[1])}}function M(i,s){1&i&&(t.TgZ(0,"mat-icon"),t._uU(1,"check"),t.qZA())}function w(i,s){1&i&&(t.TgZ(0,"mat-icon"),t._uU(1,"add"),t.qZA())}function I(i,s){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"section",2)(2,"div",3)(3,"div",4)(4,"h1",5),t._uU(5),t.qZA(),t.TgZ(6,"p",6),t._uU(7),t.qZA(),t.TgZ(8,"div",7)(9,"div",8)(10,"p",9),t._uU(11,"Rating:"),t.qZA(),t.TgZ(12,"div",10)(13,"mat-icon",11),t._uU(14,"star"),t.qZA(),t.YNc(15,A,5,2,"p",12),t.qZA()(),t.TgZ(16,"div",8)(17,"p",9),t._uU(18,"Duration:"),t.qZA(),t.TgZ(19,"p",13),t._uU(20),t.qZA()(),t.TgZ(21,"div",8)(22,"p",9),t._uU(23,"Genre:"),t.qZA(),t.TgZ(24,"p",13),t._uU(25),t.qZA()(),t.TgZ(26,"div",8)(27,"p",9),t._uU(28,"Release Date:"),t.qZA(),t.TgZ(29,"p",13),t._uU(30),t.qZA()(),t.TgZ(31,"div",8)(32,"p",9),t._uU(33,"Review:"),t.qZA(),t.TgZ(34,"p",13),t._uU(35),t.qZA()()(),t.TgZ(36,"div",14)(37,"button",15),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.requestPlayTrailer(a.item.trailerLink))}),t.TgZ(38,"span",16),t._uU(39,"Play Trailer"),t.qZA()(),t.TgZ(40,"button",17),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.requestUpdateWatchList(a.item))}),t.YNc(41,M,2,0,"mat-icon",12),t.YNc(42,w,2,0,"mat-icon",12),t.qZA()()()(),t.TgZ(43,"div",18),t._UZ(44,"img",19),t.qZA()(),t.BQk()}if(2&i){const e=t.oxw();t.xp6(5),t.hij(" ",e.item.title," "),t.xp6(2),t.hij(" ",e.item.description," "),t.xp6(8),t.Q6J("ngIf",null==e.item.rate?null:e.item.rate.split("/")),t.xp6(5),t.Oqu(e.item.duration),t.xp6(5),t.Oqu(e.item.genre),t.xp6(5),t.Oqu(e.item.releaseDate),t.xp6(5),t.Oqu(e.item.review),t.xp6(5),t.Q6J("pTooltip",e.item.isWatchList?"Remove from watch list":"Add to watch list"),t.xp6(1),t.Q6J("ngIf",null==e.item?null:e.item.isWatchList),t.xp6(1),t.Q6J("ngIf",!(null!=e.item&&e.item.isWatchList)),t.xp6(2),t.MGl("src","./assets/images/movies/",e.item.imageName,"",t.LSH)}}function C(i,s){1&i&&(t.TgZ(0,"p"),t._uU(1,"No Data"),t.qZA())}let U=(()=>{class i{constructor(e){this.dialog=e,this.watchListAction=new t.vpe}requestUpdateWatchList(e){this.watchListAction.emit(e)}requestPlayTrailer(e){this.dialog.open(L,{data:{url:e}})}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(r.uw))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-movie-detail"]],inputs:{item:"item"},outputs:{watchListAction:"watchListAction"},standalone:!0,features:[t.jDz],decls:3,vars:2,consts:[[4,"ngIf","ngIfElse"],["noData",""],[1,"text-gray-600","body-font","h-screen","flex","bg-svg-constellation-gray-100","relative"],[1,"container","mx-auto","flex","px-2","py-5","items-center","justify-center","flex-col"],[1,"lg:w-2/3","w-full","animate-fade-in-down"],[1,"name"],[1,"mt-5","mb-5","md:leading-relaxed","leading-normal","text-white","tracking-tight","text-xl"],[1,"mb-5","flex","flex-col","gap-2"],[1,"flex","gap-x-4"],[1,"text-base","text-zinc-400","font-semibold","leading-8"],[1,"text-lg","text-white","flex"],[1,"text-yellow-400","text-3xl"],[4,"ngIf"],[1,"text-lg","text-white"],[1,"flex","gap-x-4","items-center","content-center"],["mat-flat-button","","color","accent",3,"click"],[1,"text-lg","font-semibold"],["mat-icon-button","","aria-label","add or remove watchlist",1,"!text-white",3,"pTooltip","click"],[1,"w-full","h-screen"],[1,"object-cover",3,"src"],[1,"ml-2","text-lg"],[1,"text-base"]],template:function(o,a){if(1&o&&(t.YNc(0,I,45,11,"ng-container",0),t.YNc(1,C,2,0,"ng-template",null,1,t.W1O)),2&o){const l=t.MAs(2);t.Q6J("ngIf",a.item)("ngIfElse",l)}},dependencies:[c.ez,c.O5,u.ot,u.lW,u.RK,p.Ps,p.Hw,r.Is,g.z,g.u],changeDetection:0})}return i})();var y=n(8180),S=n(2181),W=n(7398),D=n(4664),f=n(9397),b=n(2096),O=n(6328),Y=n(1993),v=n(3522),d=n(5525),j=n(3403),q=n(6982),z=n(18);function _(i,s){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"app-movie-detail",1),t.NdJ("watchListAction",function(a){t.CHM(e);const l=t.oxw();return t.KtG(l.requestModifyWatchList(a))}),t.qZA(),t.BQk()}if(2&i){const e=s.ngIf;t.xp6(1),t.Q6J("item",e)}}let J=(()=>{class i{constructor(e,o,a,l){this.injector=e,this.route=o,this.movieApiService=a,this.movieStoreV2=l,this.destroyRef=(0,t.f3M)(t.ktI),this.watchList=(0,t.Flj)(()=>{const m=this.movieStoreV2.watchList();return Array.from(m.values())}),this.movieDetails=(0,t.Flj)(()=>{const m=this.movieStoreV2.movieSelected(),N=this.watchList().some(R=>R.title===m?.title);return m?{...m,isWatchList:!!N}:void 0})}ngOnInit(){this.getWatchList(),this.initEffects()}ngOnChanges(e){e.title?.currentValue&&!this.movieDetails()&&this.getMovie(this.title,this.getWatchListOnLocalStorage())}requestModifyWatchList(e){this.watchList().some(o=>o.title===e.title)?this.movieStoreV2.removeToWatchList(e):this.movieStoreV2.addToWatchList({...e,isWatchList:!0})}initRouteParams(){this.route.params.pipe((0,y.q)(1),(0,S.h)(e=>e.title),(0,W.U)(e=>e.title),(0,D.w)(e=>this.movieApiService.getMovie(e)),(0,f.b)(e=>{this.movieStoreV2.setSelectedMovie(e)})).subscribe()}getMovie(e,o){(0,b.of)(null).pipe((0,O.b)(()=>this.movieApiService.getMovie(e)),(0,f.b)(a=>{const l=o?.find(m=>m.title===e);a.isWatchList=!!l,this.movieStoreV2.setSelectedMovie(a)}),(0,Y.sL)(this.destroyRef)).subscribe()}initEffects(){(0,t.cEC)(()=>{this.setWatchListOnLocalStorage(this.watchList())},{injector:this.injector})}getWatchList(){this.movieStoreV2.setWatchList(this.getWatchListOnLocalStorage())}getWatchListOnLocalStorage(){return d._.getItem(v.F.MOVIE_WATCH_LIST)||[]}setWatchListOnLocalStorage(e){return d._.setItem(v.F.MOVIE_WATCH_LIST,e)}static#t=this.\u0275fac=function(o){return new(o||i)(t.Y36(t.zs3),t.Y36(j.gz),t.Y36(q.$),t.Y36(z.h))};static#e=this.\u0275cmp=t.Xpm({type:i,selectors:[["app-more-info"]],inputs:{title:"title"},standalone:!0,features:[t.TTD,t.jDz],decls:1,vars:1,consts:[[4,"ngIf"],[3,"item","watchListAction"]],template:function(o,a){1&o&&t.YNc(0,_,2,1,"ng-container",0),2&o&&t.Q6J("ngIf",a.movieDetails())},dependencies:[c.ez,c.O5,U],changeDetection:0})}return i})()}}]);