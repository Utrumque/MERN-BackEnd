import PostModel from "../models/Post.js"

export const getAll = async (req, res) => {
	try {
		const { q } = req.query
		const posts = await PostModel.find().sort({ _id: -1 }).populate("user").exec()
		const keys = ["fullName", "iban", "email", "city"]

		const search = (data) => {
			return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(q)))
		}

		q ? res.json(search(posts)) : res.json(posts)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Не удалось получить статьи",
		})
	}
}

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOne(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: "Не удалось вернуть статью",
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: "Статья не найдена",
					})
				}

				res.json(doc)
			}
		).populate("user")
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Не удалось получить статьи",
		})
	}
}

export const remove = async (req, res) => {
	try {
		const postId = req.params.id

		PostModel.findOneAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: "Не удалось удалить статью",
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: "Статья не найдена",
					})
				}

				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Не удалось получить статьи",
		})
	}
}

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			iban: req.body.iban,
			fullName: req.body.fullName,
			city: req.body.city,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Не удалось создать статью",
		})
	}
}

export const update = async (req, res) => {
	try {
		const postId = req.params.id

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				iban: req.body.iban,
				fullName: req.body.fullName,
				city: req.body.city,
				email: req.body.email,
				password: req.body.password,
				phone: req.body.phone,
			}
		)

		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: "Не удалось обновить статью",
		})
	}
}
