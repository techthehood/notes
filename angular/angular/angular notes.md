# angular notes

##### getting started

**start a new npm project**
```
npm init -y
```

**install angular cli**
```
  npm install -g @angular/cli
```


**run the angular project/workspace creator**
```
  ng new my-app
```

**run the angular dev server**
```
  ng serve --open
```

**i think its cool that the app can make its own components. (i made it from the workspace root)**

ws root
```
  ng generate component heroes
```

[angular tutorial](https://angular.io/tutorial)   

##### [lifecycle hooks docs](https://angular.io/guide/lifecycle-hooks#oninit)   


**i was instructed to make a ng-model but for it to work the app needs to import FormModule**
>The missing FormsModule
Notice that the app stopped working when you added [(ngModel)].
Although ngModel is a valid Angular directive, it isn't available by default.

>It belongs to the optional FormsModule and you must opt-in to using it.

hero.component.html
```
  <h2>{{hero.name | uppercase}} details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ng-model)]="hero.name" placeholder="name">
    </label>
  </div>
```

app.module.ts
**and ngModule needs to import FormsModule**
```
  import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [
      AppComponent,
      HeroesComponent
    ],
    imports: [
      BrowserModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
```
