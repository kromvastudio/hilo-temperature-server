const fetch = require('node-fetch'); //fetch() from the Browser, instead of using XMLHttpRequest

module.exports = (app) => {
  let zipcode;
  app.post('/validate-zipcode', (req, res) => {
    zipcode = req.body.zipcode;
    if(!zipcode || zipcode.length < 5 || zipcode.length > 5) {
      res.redirect('/wrong-zip');
	} else { 
	  res.redirect('/temp-card');
	}
  })

  app.get('/hilo-temps', (req, res) => {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';	
	const apiId = '&appid=<<<Insert Open Weather Map Public API Key here>>>&units=imperial';
	const cityCode = (preUrl, postUrl, zipcode) => {
	  let newUrl = preUrl + zipcode + postUrl;
	  return newUrl;
	};	

	const apiUrl = cityCode(baseUrl, apiId, zipcode);
	  fetch(apiUrl)
	    .then(res => res.json())
		.then(data => {
	      res.send({ data });
	    })
		.catch(err => {
		  res.redirect('/error');
		});
  })

}