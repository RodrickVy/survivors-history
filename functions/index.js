const functions = require("firebase-functions");
const fs = require('fs-extra')
const express = require('express')

const app = express()

stories = [
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/marietashoots.png?fit=255%2C192&ssl=1",
        "survivor": "Marie Tashoots",
        "residential_school": "Lower Post Residential School",
        "link_to_story": "https://legacyofhope.ca/en/wherearethechildren/stories/tashoots/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/roydick.png?fit=255%2C192&ssl=1",
        "survivor": "Roy Dick",
        "residential_school": "Lower Post Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/dick/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/matildamallett.png?fit=1350%2C1018&ssl=1",
        "survivor": "Matilda Mallett",
        "residential_school": "Brandon Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/mallett/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/evelynlariviere.png?fit=255%2C192&ssl=1",
        "survivor": "Evelyn Lariviere",
        "residential_school": "Pine Creek Residential School and Assiniboia Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/elariviere/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/mabelgrey.png?fit=255%2C192&ssl=1",
        "survivor": "Mabel Grey",
        "residential_school": "St. Bernard’s Mission",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/grey/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/peggyshannon.png?fit=255%2C192&ssl=1",
        "survivor": "Peggy Shannon Abraham",
        "residential_school": "Alert Bay",
        "link_to_story": "https://legacyofhope.ca/wherearethechildren/stories/shannonabraham/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/francisbent.png?fit=255%2C192&ssl=1",
        "survivor": "Francis Bent",
        "residential_school": "St. George’s Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/bent/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/timantoine.png?fit=255%2C192&ssl=1",
        "survivor": "Tim Antoine",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/antoine/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/edmarten.png?fit=255%2C192&ssl=1",
        "survivor": "Ed Marten",
        "residential_school": "Holy Angels Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/marten/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/terrylusty.png?fit=255%2C192&ssl=1",
        "survivor": "Terry Lusty",
        "residential_school": "St. Joseph’s Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/lusty/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/kappophilomene.png?fit=255%2C192&ssl=1",
        "survivor": "Kappo Philomene",
        "residential_school": "St. Francis Xavier",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/philomene/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/janesteaster.png?fit=255%2C192&ssl=1",
        "survivor": "Janet Easter",
        "residential_school": "McKay Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/easter/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/mattess.png?fit=255%2C192&ssl=1",
        "survivor": "Lucille Mattess",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/mattess/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/battaja.png?fit=255%2C192&ssl=1",
        "survivor": "Rev. Mary Battaja",
        "residential_school": "Choutla Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/battaja/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/severight.png?fit=255%2C192&ssl=1",
        "survivor": "Grant Severight",
        "residential_school": "St. Philips Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/severight/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/page.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Velma Page                                      ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/rope.png?fit=1222%2C932&ssl=1",
        "survivor": "Lorna Rope",
        "residential_school": "St. Paul’s in Lebret, SK",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/rope/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/ambers.png?fit=255%2C192&ssl=1",
        "survivor": "Basil Ambers",
        "residential_school": "St. Michael’s Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/ambers/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/fontaine.png?fit=255%2C192&ssl=1",
        "survivor": "Mabel Harry Fontaine",
        "residential_school": "Fort Alexander Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/fontaine/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/dawson.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Carole Dawson                                      ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/Screen-Shot-2020-11-23-at-2.37.50-PM.png?fit=255%2C192&ssl=1",
        "survivor": "Walter West",
        "residential_school": "Takla First Nation",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/west/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/paul.png?fit=255%2C192&ssl=1",
        "survivor": "Elsie Paul",
        "residential_school": "Sechelt Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/paul/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/desjarlais.png?fit=255%2C192&ssl=1",
        "survivor": "Joseph Desjarlais",
        "residential_school": "Lapointe Hall, Breyant Hall",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/desjarlais/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/jack.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Melvin Jack                                      ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/george.png?fit=255%2C192&ssl=1",
        "survivor": "Aggie George",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/george/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/green.png?fit=255%2C192&ssl=1",
        "survivor": "Dennis George Green",
        "residential_school": "Ermineskin Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/green/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/watcheston.png?fit=255%2C192&ssl=1",
        "survivor": "Rita Watcheston",
        "residential_school": "Lebret",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/watcheston/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/bitternose.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Ed Bitternose                                      ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/gray.png?fit=255%2C192&ssl=1",
        "survivor": "Eunice Gray",
        "residential_school": "St. Andrew’s Anglican Mission",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/gray/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/mclean.png?fit=255%2C192&ssl=1",
        "survivor": "William McLean",
        "residential_school": "Stone Residential School, Poundmakers Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/mclean/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/albrecht.png?fit=255%2C192&ssl=1",
        "survivor": "Beverly Albrecht",
        "residential_school": "Mohawk Institute",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/albrecht/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/mcgillivray.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Harry McGillivray                                ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/scribe.png?fit=255%2C192&ssl=1",
        "survivor": "Charles Scribe",
        "residential_school": "Jack River School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/scribe/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/nooski.png?fit=255%2C199&ssl=1",
        "survivor": "Roy Nooski",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/nooski/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/tomah.png?fit=255%2C192&ssl=1",
        "survivor": "Robert Tomah",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/tomah/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/stonechild.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Dillan Stonechild                                ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/ross.png?fit=255%2C192&ssl=1",
        "survivor": "Suamel Ross",
        "residential_school": "All Saints Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/ross/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/fourstar.png?fit=255%2C192&ssl=1",
        "survivor": "Arthur Fourstar",
        "residential_school": "Birtle Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/fourstar/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/kistabish.png?fit=255%2C192&ssl=1",
        "survivor": "Richard Kistabish",
        "residential_school": "St. Marc’s Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/kistabish/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/gfrancis.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "George Francis                                    ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/miller.png?fit=255%2C192&ssl=1",
        "survivor": "Verna Miller",
        "residential_school": "St. George’s Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/miller/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/ballantyne.png?fit=255%2C192&ssl=1",
        "survivor": "Percy Ballantyne",
        "residential_school": "Birtle Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/ballantyne/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/easton.png?fit=255%2C192&ssl=1",
        "survivor": "Blanche Hill-Easton",
        "residential_school": "Mohawk Institute",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/easton/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/arnault.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Brenda Bignell Arnault                      ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/burns.png?fit=255%2C192&ssl=1",
        "survivor": "Riley Burns",
        "residential_school": "Gordons Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/burns/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/lewis.png?fit=255%2C192&ssl=1",
        "survivor": "Patricia Lewis",
        "residential_school": "Shubenacadie Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/lewis/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/flowers.png?fit=255%2C192&ssl=1",
        "survivor": "Shirley Flowers",
        "residential_school": "Yale School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/flowers/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/bird.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Nazaire Azarie-Bird                            ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/marks.png?fit=255%2C192&ssl=1",
        "survivor": "Julia Marks",
        "residential_school": "Christ King School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/marks/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/wood.png?fit=255%2C192&ssl=1",
        "survivor": "Jennifer Wood",
        "residential_school": "Portage Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/wood/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/wolf.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "David Striped Wolf                              ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/rosssss.png?fit=255%2C192&ssl=1",
        "survivor": "Johnny Brass",
        "residential_school": "Gordons Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/brass/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/lathlin.png?fit=255%2C192&ssl=1",
        "survivor": "William George Lathlin",
        "residential_school": "All Saints Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/lathlin/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/caesar.png?fit=255%2C192&ssl=1",
        "survivor": "Mary Caesar",
        "residential_school": "Lower Point Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/caesar/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/solonas.png?fit=255%2C192&ssl=1",
        "survivor": "",
        "residential_school": "Alfred Solonas                                 ",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/laforme.png?fit=255%2C192&ssl=1",
        "survivor": "Darlene Laforme",
        "residential_school": "Mohawk Institute",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/laforme/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/sheldon.png?fit=255%2C192&ssl=1",
        "survivor": "James Leon Sheldon",
        "residential_school": "Lower Point Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/sheldon/",
        "story-type": "residential_schools"
    },
    {
        "imageSrc": "https://i0.wp.com/legacyofhope.ca/wp-content/uploads/2020/11/ketlo.png?fit=255%2C192&ssl=1",
        "survivor": "Cecil Ketlo",
        "residential_school": "Lejac Indian Residential School",
        "link_to_story": "https://legacyofhope.ca/where-are-the-children-2/ketlo/",
        "story-type": "residential_schools"
    }
];





app.get('/api', (req, res) => {
    res.send(JSON.stringify(stories));
})




exports.app = functions.https.onRequest(app);
