import axios from "axios";

export const getArticles = async (req, res) => {
  try {
    const query = req.query.q;

    // Wikipedia API
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        list: "search",
        srsearch: query,
        format: "json",
      },
    });

    const articles = response.data.query.search.map((item) => ({
      id: item.pageid,
      title: item.title,
      snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // remove HTML tags
      url: `https://en.wikipedia.org/?curid=${item.pageid}`,
      thumbnail: "/educational-article-thumbnail.png", // static placeholder
      source: "Wikipedia",
    }));

    res.json({ articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};
