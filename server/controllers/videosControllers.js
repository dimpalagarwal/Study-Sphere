import axios from "axios";

export const getVideos = async (req, res) => {
  try {
    const query = req.query.q; // user search query
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Step 1: Search for videos
    const searchResponse = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults: 6,
        key: apiKey,
      },
    });

    // Step 2: Extract video IDs
    const videoIds = searchResponse.data.items
      .map(item => item.id.videoId)
      .filter(id => id); // remove undefined

    if (videoIds.length === 0) {
      return res.json({ videos: [] });
    }

    // Step 3: Get full video details to ensure they are playable
    const detailsResponse = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet,contentDetails,status",
        id: videoIds.join(","),
        key: apiKey,
      },
    });

    // Step 4: Filter only playable public videos
    const videos = detailsResponse.data.items
  .filter(
    v =>
      v.status.uploadStatus === "processed" &&
      v.status.privacyStatus === "public" &&
      v.status.embeddable === true // <-- only embeddable videos
  )
  .map(v => ({
    id: v.id,
    videoId: v.id,
    title: v.snippet.title,
    thumbnail: v.snippet.thumbnails.high.url,
    channel: v.snippet.channelTitle,
  }));

    res.json({ videos });
  } catch (err) {
    console.error(err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
