const PORT = process.env.PORT || 8080

const fs = require('fs-extra')
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const base_link = "https://legacyofhope.ca/wherearethechildren/stories/";

 stories = [];

function getSeriesVideos() {
    axios.get(base_link)
        .then(response => {
            const htmlText = response.data;
            const $ = cheerio.load(htmlText)

            $('.fusion_builder_column', htmlText).each(function () {
                const survivor = $(this).find(".fusion-text").children("p").children("a").first().children("span").text();
                const link_to_story = $(this).find(".fusion-text").children("p").children("a").attr("href");
                const residential_school = $(this).find(".fusion-text").children("p").children("span").first().text();
                const imageSrc = $(this).find("img").attr("src");

                const contentObject = {
                    imageSrc,
                    survivor,
                    residential_school,
                    link_to_story,
                    "story-type": "residential_schools"
                };

                stories.push(contentObject);


            })

        }).catch((e) => console.log(e));

}

function readFile() {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            stories = JSON.parse(data);

        }
    });
}

readFile();
app.get('/', (req, res) => {
    res.json(stories);
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
