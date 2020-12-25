experimenting with non blocking code

non-blocking would be
```
fn 1
fn 2
log3

results
fn 1 started
fn 2 started
log 3 result

fn 1 result
fn 2 result

```
articles
[Is JavaScript synchronous or asynchronous? What the hell is a promise?](https://medium.com/@kvosswinkel/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb)   
[Making Blocking Functions Non-blocking in JavaScript](https://medium.com/@maxdignan/making-blocking-functions-non-blocking-in-javascript-dfeb9501301c)   
[Making Blocking Functions Non-blocking in JavaScript](https://medium.com/@maxdignan/making-blocking-functions-non-blocking-in-javascript-dfeb9501301c)  
_this article suggests making recursive fn's that call itself based on conditions (if statements)_   


this is what i am looking for in non blocking code where fn 1 could be an ajax/fetch fn to get db data


i want to test promises
i also want to test array loops like forEach


try a beers on the wall fetch that retrieves x lines of results

apis to try

[6 Interesting APIs to Check Out in 2018](https://codeburst.io/6-interesting-apis-to-check-out-in-2018-5d6830063f29)
[What are some cool/fun/random APIs, such as BreweryDB?](https://www.quora.com/What-are-some-cool-fun-random-APIs-such-as-BreweryDB)
[A Collective List Of APIs. Build Something.](https://apilist.fun/)
[what are some fun apis to play with?](https://www.reddit.com/r/webdev/comments/3wrswc/what_are_some_fun_apis_to_play_with/)
[random apis](https://www.programmableweb.com/category/random/api)
[random quote](https://api.whatdoestrumpthink.com/api/v1/quotes/random)
>"If Hillary Clinton can't satisfy her husband what makes her think she can satisfy America."
>"message":"If you see somebody getting ready to throw a tomato, knock the crap out of them, would you? Seriously. "
>"I think the only difference between me and the other candidates is that I'm more honest and my women are more beautiful"
>"Russia, if you're listening, I hope you're able to find the 30,000 emails that are missing"
>"I'd like to use really foul language. I won't do it. I was going to say they're really full of s**t, but I won't say that."
