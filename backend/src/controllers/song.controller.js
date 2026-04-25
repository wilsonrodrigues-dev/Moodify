const songModel = require("../models/song.model");
const id3 = require("node-id3");
const storageservice = require("../services/stirage.service");


async function uploadSong(req, res) {
  const songBuffer = req.file.buffer;
  const tags = id3.read(req.file.buffer);
  const { mood } = req.body;

  const [songFile, posterFile] = await Promise.all([
    storageservice.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/song/songs",
    }),
    storageservice.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/song/poster",
    }),
  ]);

  const song = await songModel.create({
    title: tags.title,
    url: songFile.url,
    posterUrl: posterFile.url,
    mood,
  });

  res.status(200).json({
    nessage: "song uploade successfull",
    song,
  });
}

async function getSong(req,res) {

  const {mood}=req.query

  const song= await songModel.findOne({mood})

  res.status(200).json({
    message:"song fetch succfully",
    song
  })

}

module.exports = {
  uploadSong,getSong
};
