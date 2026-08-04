const mediaRepository = require('../repositories/Media.repository');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const path = require('path');

class MediaService {
  async uploadMedia(file) {
    if (!file) throw new ApiError(400, 'No file uploaded');

    const mediaData = {
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`
    };

    return await mediaRepository.create(mediaData);
  }

  async getMedia(page, limit, search) {
    const filters = {};
    if (search) {
      filters.$text = { $search: search };
    }
    return await mediaRepository.paginate(page, limit, filters);
  }

  async deleteMedia(id) {
    const media = await mediaRepository.findById(id);
    if (!media) throw new ApiError(404, 'Media not found');

    const filePath = path.join(__dirname, '../../uploads', media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await mediaRepository.delete(id);
    return true;
  }
}

module.exports = new MediaService();
