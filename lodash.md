
# Lodash notes
** used for angularjs merge **

## [angularjs reccomendation](https://docs.angularjs.org/api/ng/function/angular.merge)

[lodash merge docs](https://lodash.com/docs/4.17.5#merge)
[docs for using lodash](https://github.com/lodash/lodash/wiki/FP-Guide)

doc example
```
	/ Use `noConflict` to restore the pre-fp variant.
	var fp = _.noConflict();
```

my example
```
	var lodash = _.noConflict();
```

use in data.js
```
	serve.data = lodash.merge(serve.data,serve.default_data);//lodash.js
```

view.html.php
```
    $cnx = $this->check_cnx("cdn.jsdelivr.net");
    $scriptLoc = ($cnx) ?  "https://cdn.jsdelivr.net/npm/lodash@4.17.5/lodash.min.js" :
    ($release_version == "production") ? JUri::base() . "components/com_psmod/xfiles/js/lodash.js" :JUri::root() . "core/js/lodash.js";
    $fileLink->addScript($scriptLoc);
```

set in files:
\administrator\components\com_psmod\xfiles\js\lodash.js
\core\js\lodash.js