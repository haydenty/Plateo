"use strict";var plateoApp=angular.module("plateoApp",["ngRoute"]);plateoApp.constant("constants",{apis:{plateoApiBaseUrl:"http://localhost:3000/"}}),plateoApp.config(["$routeProvider","$httpProvider",function(e,t){t.interceptors.push("TokenInterceptor"),e.when("/",{templateUrl:"app/components/home/home.html",controller:"mainController",access:{requiredLogin:!1}}).when("/plateSearch",{templateUrl:"app/components/search/plateSearch.html",controller:"searchController",access:{requiredLogin:!1}}).when("/myPlates",{templateUrl:"app/components/myPlates/myPlates.html",controller:"myPlatesController",access:{requiredLogin:!0}}).when("/plate",{templateUrl:"app/components/plate/plate.html",controller:"plateController",access:{requiredLogin:!1}}).when("/login",{templateUrl:"app/shared/login/login.html",controller:"loginController",access:{requiredLogin:!1}}).when("/register",{templateUrl:"app/shared/register/register.html",controller:"loginController",access:{requiredLogin:!1}})}]),plateoApp.run(["$rootScope","$window","$location","AuthenticationFactory",function(e,t,a,n){n.check(),e.$on("$routeChangeStart",function(e,r,o){r.access&&r.access.requiredLogin&&!n.isLogged?a.path("/login"):(n.user||(n.user=t.sessionStorage.user),n.userRole||(n.userRole=t.sessionStorage.userRole))}),e.$on("$routeChangeSuccess",function(t,r,o){e.showMenu=n.isLogged,e.role=n.userRole,1==n.isLogged&&"/login"==a.path()&&a.path("/")})}]),plateoApp.controller("mainController",["$scope","$location","UserAuthFactory",function(e,t,a){var n=e;n.isActive=function(e){return e===t.path()},n.logout=function(){a.logout()}}]),plateoApp.controller("plateController",["$scope","plateService",function(e,t){var a=e;a.comments=[],a.initialize=function(){a.plate=t.getPlateToShow();var e=t.getComments();e.then(function(e){a.comments=e},function(e){alert("Error happened getting comments: ",JSON.stringify(e))})},a.follow=function(){t.follow().then(function(e){},function(e){alert("Error occurred trying to follow plate: ",JSON.stringify(e))})},a.addComment=function(){if(""!==a.newComment){var e=(a.plate,a.newComment),n=t.addComment(e);n.then(function(e){a.newComment=""})}},a.initialize()}]),plateoApp.controller("searchController",["$scope","$location","plateService",function(e,t,a){var n=e;n.states=[{name:"ALABAMA",abbreviation:"AL"},{name:"ALASKA",abbreviation:"AK"},{name:"AMERICAN SAMOA",abbreviation:"AS"},{name:"ARIZONA",abbreviation:"AZ"},{name:"ARKANSAS",abbreviation:"AR"},{name:"CALIFORNIA",abbreviation:"CA"},{name:"COLORADO",abbreviation:"CO"},{name:"CONNECTICUT",abbreviation:"CT"},{name:"DELAWARE",abbreviation:"DE"},{name:"DISTRICT OF COLUMBIA",abbreviation:"DC"},{name:"FEDERATED STATES OF MICRONESIA",abbreviation:"FM"},{name:"FLORIDA",abbreviation:"FL"},{name:"GEORGIA",abbreviation:"GA"},{name:"GUAM",abbreviation:"GU"},{name:"HAWAII",abbreviation:"HI"},{name:"IDAHO",abbreviation:"ID"},{name:"ILLINOIS",abbreviation:"IL"},{name:"INDIANA",abbreviation:"IN"},{name:"IOWA",abbreviation:"IA"},{name:"KANSAS",abbreviation:"KS"},{name:"KENTUCKY",abbreviation:"KY"},{name:"LOUISIANA",abbreviation:"LA"},{name:"MAINE",abbreviation:"ME"},{name:"MARSHALL ISLANDS",abbreviation:"MH"},{name:"MARYLAND",abbreviation:"MD"},{name:"MASSACHUSETTS",abbreviation:"MA"},{name:"MICHIGAN",abbreviation:"MI"},{name:"MINNESOTA",abbreviation:"MN"},{name:"MISSISSIPPI",abbreviation:"MS"},{name:"MISSOURI",abbreviation:"MO"},{name:"MONTANA",abbreviation:"MT"},{name:"NEBRASKA",abbreviation:"NE"},{name:"NEVADA",abbreviation:"NV"},{name:"NEW HAMPSHIRE",abbreviation:"NH"},{name:"NEW JERSEY",abbreviation:"NJ"},{name:"NEW MEXICO",abbreviation:"NM"},{name:"NEW YORK",abbreviation:"NY"},{name:"NORTH CAROLINA",abbreviation:"NC"},{name:"NORTH DAKOTA",abbreviation:"ND"},{name:"NORTHERN MARIANA ISLANDS",abbreviation:"MP"},{name:"OHIO",abbreviation:"OH"},{name:"OKLAHOMA",abbreviation:"OK"},{name:"OREGON",abbreviation:"OR"},{name:"PALAU",abbreviation:"PW"},{name:"PENNSYLVANIA",abbreviation:"PA"},{name:"PUERTO RICO",abbreviation:"PR"},{name:"RHODE ISLAND",abbreviation:"RI"},{name:"SOUTH CAROLINA",abbreviation:"SC"},{name:"SOUTH DAKOTA",abbreviation:"SD"},{name:"TENNESSEE",abbreviation:"TN"},{name:"TEXAS",abbreviation:"TX"},{name:"UTAH",abbreviation:"UT"},{name:"VERMONT",abbreviation:"VT"},{name:"VIRGIN ISLANDS",abbreviation:"VI"},{name:"VIRGINIA",abbreviation:"VA"},{name:"WASHINGTON",abbreviation:"WA"},{name:"WEST VIRGINIA",abbreviation:"WV"},{name:"WISCONSIN",abbreviation:"WI"},{name:"WYOMING",abbreviation:"WY"}],n.selectedState=n.states[0],n.searchComplete=!1,n.search=function(){n.searchComplete=!1;var e=n.enteredPlateNumber,t=n.selectedState,r=a.searchPlates(e,t);r.then(function(e){n.searchResultPlates=e,0===n.searchResultPlates.length&&(n.searchComplete=!0)},function(e){alert("Error occured while searching for plate: ",JSON.stringify(e))})},n.plateClicked=function(e){a.plateChoosen(e),t.path("plate")}}]),plateoApp.service("plateService2",["$resource","constants","AuthenticationFactory",function(e,t,a){return e({})}]),plateoApp.service("plateService",["$q","$http","constants","userService","AuthenticationFactory",function(e,t,a,n,r){var o=a.apis.plateoApiBaseUrl,i={};return{plateChoosen:function(e){console.log("setting plate",e),i=e},getPlateToShow:function(){return i},follow:function(){return t({method:"POST",url:o+"api/v1/plates/follow",data:{userId:r.user._id,plateId:i._id,createDateTime:new Date}}).then(function(e){return e})},searchPlates:function(e,a){return t.get(o+"plates").then(function(e){return e.data})},getMyPlates:function(){return t.get(o+"api/v1/plates/"+r.user._id).then(function(e){return e})},getComments:function(){return t.get(o+"comments/"+i._id).then(function(e){return e.data})},addComment:function(e){return t({method:"POST",url:o+"api/v1/plates/comment",data:{plateId:i._id,comment:e,user:{userId:r.user._id,username:r.user.username},createDateTime:new Date}}).then(function(e){return e})}}}]),plateoApp.service("userService",function(){var e;return{setCurrentUser:function(t){e=t},getCurrentUser:function(){return e}}}),plateoApp.controller("myPlatesController",["$scope","$location","plateService",function(e,t,a){var n=e;n.plateClicked=function(e){a.plateChoosen(e),t.path("plate")};var r=a.getMyPlates();r.then(function(e){e.data?n.myPlates=e.data:n.myPlates=[]},function(e){alert("Error happened getting my plates: ",JSON.stringify(e))})}]),plateoApp.factory("AuthenticationFactory",["$window",function(e){var t={isLogged:!1,check:function(){console.log("Checking the magic!"),e.localStorage.token&&e.localStorage.user?(this.isLogged=!0,this.user=JSON.parse(e.localStorage.user)):(this.isLogged=!1,delete this.user)}};return t}]),plateoApp.factory("UserAuthFactory",["$window","$location","$http","constants","AuthenticationFactory",function(e,t,a,n,r){var o=n.apis.plateoApiBaseUrl;return{login:function(e,t){return a.post(o+"login",{username:e,password:t})},logout:function(){r.isLogged&&(r.isLogged=!1,delete r.user,delete r.userRole,delete e.localStorage.token,delete e.localStorage.expires,delete e.localStorage.user,delete e.localStorage.userRole,t.path("/login"))},register:function(e,t,n,r,i){return a.post(o+"register",{firstname:e,lastname:t,email:n,username:r,password:i,verifyPassword:i})}}}]),plateoApp.factory("TokenInterceptor",["$q","$window",function(e,t){return{request:function(a){return a.headers=a.headers||{},t.localStorage.token&&(a.headers["X-Access-Token"]=JSON.parse(localStorage.getItem("token")),a.headers.Expires=localStorage.getItem("expires"),a.headers["Content-Type"]="application/json"),a||e.when(a)},response:function(t){return t||e.when(t)}}}]),plateoApp.controller("loginController",["$scope","$window","$location","UserAuthFactory","AuthenticationFactory","userService",function(e,t,a,n,r,o){e.user={username:"",password:"",verifypassword:"",email:"",firstname:"",lastname:""},e.errorMessage="",e.keyPress=function(t){13==t&&e.login()},e.login=function(){var i=e.user.username,s=e.user.password;e.errorMessage="",""!==i&&""!==s?n.login(i,s).success(function(e){r.isLogged=!0,r.user=e.user,r.userRole=e.user.role,t.localStorage.token=JSON.stringify(e.token),t.localStorage.expires=e.expires,t.localStorage.user=JSON.stringify(e.user),t.localStorage.userRole=e.user.role,o.setCurrentUser(e.user),a.path("/plateSearch")}).error(function(t){"Invalid credentials!!"==t.message?e.errorMessage="Looks like we couldn't find a username associated with that password, please try again.":e.errorMessage=t.message}):""==s&&""!==i?e.errorMessage="Make sure to enter your password":""==i&&""!==s&&(e.errorMessage="Make sure to enter your username")},e.register=function(){var t=e.user.username,a=e.user.password,r=e.user.verifypassword,o=e.user.email,i=e.user.firstname,s=e.user.lastname;e.errorMessage="",a==r?""!==t&&""!==a&&""!==i&&""!==s&&void 0!==o?n.register(i,s,o,t,a).success(function(t){e.login()}).error(function(t){e.errorMessage="Oops look like we messed something up, please try again ",null!==t&&(e.errorMessage+=t.message)}):e.errorMessage="Make sure to fill everything in, cheers!":e.errorMessage="Passwords don't match, please try again"}}]),plateoApp.controller("registerController",["$scope",function(e){}]);
//# sourceMappingURL=app.js.map
