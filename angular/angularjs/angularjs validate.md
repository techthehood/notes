HOW DO SUBMIT ONLY VALID FORMS

```

	<div ng-form name="megaForm" class="mM_new_cat_title_editor" ng-show="take1.create_category == 1" >
		<div class="">
		<label for="">category title</label>
		<button type="button" class="mM_new_cat_cancel w3-btn" ng-click="take1.createCategory()">
		<i class="material-icons" style="font-size:1.5rem;color:#17315a">done</i></button>
		<button type="button" class="mM_new_cat_cancel w3-btn" ng-click="take1.create_category = 0;take1.reset_cat_creator()">
		<i class="material-icons" style="font-size:1.5rem;color:#17315a">close</i></button>
		</div>
		<input type="text" name="take1.catInp" value="" ng-model="take1.new_category_title" ng-change="take1.check_title(take1.new_category_title)"
		placeholder="Enter category title..." ng-class="{invalid:take1.valid_title == 'invalid'}" ng-keypress="take1.check_enter()" ng-init="take1.catInp = megaForm">
	</div>
```

forms can't be called directly in child controller ( i think controllers in the original scope work ok)

to call a form from something line a directives templateUrl you have to use the 
$$childHead property, which may not work in chrome. or you have to pass it in using a function take1.check_enter(megaForm)  or you can set it equal to an internal variable for later use using the ng-init directive or something else that you can get to run early i.e. data-start="{{take1.setForm(megaForm)}}

and in the controller it would run a function like this
this.setForm = function(form){boss.catInp = form;}

whatever way you pass in the form as a value it won't work if you try ng-init on the actual form element.  

div ng-form="megaForm" also works