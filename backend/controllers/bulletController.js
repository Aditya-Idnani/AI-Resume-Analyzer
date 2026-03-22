import { improveBullet } from "../services/bulletImprover.js";

export const improveResumeBullet = async (req, res) => {

  try {

    const { bullet } = req.body;

    if (!bullet) {
      return res.status(400).json({
        error: "Bullet point is required"
      });
    }

    const improved = await improveBullet(bullet);

    res.json({
      original: bullet,
      improved
    });

  } catch (error) {

    console.error("Bullet improvement failed:", error);

    res.status(500).json({
      error: "Failed to improve bullet"
    });

  }

};