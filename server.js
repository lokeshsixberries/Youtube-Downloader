const handlebars = require('hbs');
const express = require('express');
const ytdl = require('ytdl-core');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", 'hbs');
app.set('views', './views');
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const videoUrl = req.body.url;
    if ((videoUrl || '').length > 0) {
        let info = await ytdl.getInfo(videoUrl);
        res.render('index', { data: info?.formats, about: info })
    }

});

app.listen(4000, () => {
    console.log("Server is running");
});


