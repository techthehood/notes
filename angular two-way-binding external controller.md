
possible help
//https://stackoverflow.com/questions/18363121/two-way-binding-in-directive-that-is-inside-a-template-not-working
//$timeout intro
https://docs.angularjs.org/error/$rootScope/inprog?p0=$apply
//another $timeout
https://stackoverflow.com/questions/25233932/angularjs-field-in-ui-not-reflecting-updated-model-value
//more articles
https://nathanleclaire.com/blog/2014/01/31/banging-your-head-against-an-angularjs-issue-try-this/

//the issue: when using an external controller and referencing it in the directive in any form either by controller as (with bindToController:true), or adding it using scope object in the controller the referenced controller is like making a clone of the original with an entirely separate scope from the original.  They do the same thing but 'this' in one is not the same as 'this' in the other.  the solution is to use something static to hold the values between the two that both the original and its mirror can share, which would be a service.  Thats it, thats all.  update the service and update the view regardless of which twin is being used.

//USE A SERVICE TO ENSURE DATA CONSISTENCY!!!