const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255, required: true },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
});

// Middleware tạo slug từ name trước khi lưu (dùng slugify để tạo các slug duy nhất của từng khóa học)
Course.pre('validate', async function (next) {
    if (this.name && (!this.slug || this.isModified('name'))) {
        const baseSlug = slugify(this.name, {
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true,
        });

        let slug = baseSlug;
        let counter = 1;

        // Đảm bảo slug là duy nhất
        while (await this.constructor.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }

        this.slug = slug;
    }

    next();
});

// Add plugin
Course.plugin(mongooseDelete, {
    deletedAt: true ,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course);
