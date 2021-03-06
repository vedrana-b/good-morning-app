$(document).ready(function () {
    let lat;
    let lon;
    //Get info depending on browser geolocation
    function currentTemp(position) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $('main').css('display', 'block');
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                let cityUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=7G6lZU28Cy4TNywTtggI11Vt8cWiLTZV&q=${lat}%2C${lon}`
                //Get info depending on browser geolocation
                $.ajax({
                    url: cityUrl,
                    type: "GET",
                    success: function (data) {
                        // console.log(data);
                        $('#city').html(data.EnglishName + ',' + data.Country.EnglishName);
                    }
                });

                let currentTempUrl = `https://dataservice.accuweather.com/currentconditions/v1/298198?apikey=7G6lZU28Cy4TNywTtggI11Vt8cWiLTZV`
                $.ajax({
                    url: currentTempUrl,
                    type: "GET",
                    success: function (data) {
                        // console.log(data["0"]);
                        $('#current-temp').html(data["0"].Temperature.Metric.Value + "&deg");
                        $('#weather-text').html("It's " + data['0'].WeatherText);
                    }
                });

                let forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/298198?apikey=7G6lZU28Cy4TNywTtggI11Vt8cWiLTZV&metric=true`
                $.ajax({
                    url: forecastUrl,
                    type: "GET",
                    success: function (data) {
                        //console.log(data.DailyForecasts[1]);
                        let firstDay = data.DailyForecasts[1];
                        let secondDay = data.DailyForecasts[2];
                        let thirdDay = data.DailyForecasts[3];
                        let fourthDay = data.DailyForecasts[4];
                        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var first = new Date();
                        first.setDate(first.getDate() + 1);

                        var second = new Date();
                        second.setDate(second.getDate() + 2);

                        var third = new Date();
                        third.setDate(third.getDate() + 3);

                        var fourth = new Date();
                        fourth.setDate(fourth.getDate() + 4);

                        let dayOne = weekday[first.getDay()];
                        let dayTwo = weekday[second.getDay()];
                        let dayThree = weekday[third.getDay()];
                        let dayFour = weekday[fourth.getDay()];

                        $('#day-one').html(dayOne);
                        $('#day-two').html(dayTwo);
                        $('#day-three').html(dayThree);
                        $('#day-four').html(dayFour);

                        $('#day-one-temp').html(firstDay.Temperature.Maximum.Value + ' &#176;C');
                        $('#day-two-temp').html(secondDay.Temperature.Maximum.Value + ' &#176;C');
                        $('#day-three-temp').html(thirdDay.Temperature.Maximum.Value + ' &#176;C');
                        $('#day-four-temp').html(fourthDay.Temperature.Maximum.Value + ' &#176;C');

                        $('#day-one-icon').attr('src', './img/' + firstDay.Day.Icon + '.png');
                        $('#day-two-icon').attr('src', './img/' + secondDay.Day.Icon + '.png');
                        $('#day-three-icon').attr('src', './img/' + thirdDay.Day.Icon + '.png');
                        $('#day-four-icon').attr('src', './img/' + fourthDay.Day.Icon + '.png');
                    }
                });

                $.ajax({
                    async: true,
	                crossDomain: true,
                    url: "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=tJzD2tCqAJKkAeghB7Uc6ZS2Y1ONVcju",
                    method: "GET",
                    success: function (data) {
                        let news = data.results;
                        $('#news-two').append('<a id="news-two-url"></a>')
                        $('#news-two-url').html(news['0'].title);
                        $('#news-two-url').attr('href', news['0'].url);

                        $('#news-three').append('<a id="news-three-url"></a>')
                        $('#news-three-url').html(news['2'].title);
                        $('#news-three-url').attr('href', news['0'].url);

                        $('#news-one').append('<a id="news-one-url"></a>')
                        $('#news-one-url').html(news['1'].title);
                        $('#news-one-url').attr('href', news['0'].url);

                        $('#news-four').append('<a id="news-four-url"></a>')
                        $('#news-four-url').html(news['3'].title);
                        $('#news-four-url').attr('href', news['0'].url);

                        $('#news-one-img').attr('src', news['0'].multimedia['0'].url);
                        $('#news-two-img').attr('src', news['1'].multimedia['1'].url);
                        $('#news-three-img').attr('src', news['2'].multimedia['2'].url);
                        $('#news-four-img').attr('src', news['3'].multimedia['3'].url);
                    }
                });

                $.ajax({
                    url: 'https://api.unsplash.com/photos/random?client_id=dCQBiBW5-qkFQjqs-HZ7pdvW0XOJhvniCh6HEfrJJU8&count=5',
                    type: "GET",
                    success: function (data) {
                        //console.log(data);
                        $('#img-one').attr('src', data[0].urls.small);
                        $('#img-two').attr('src', data[1].urls.small);
                        $('#img-three').attr('src', data[2].urls.small);
                        $('#img-four').attr('src', data[4].urls.small);
                        $('.container--header').css('background-image', 'url(' + data[3].urls.regular + ')');
                    }
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    } currentTemp();
});