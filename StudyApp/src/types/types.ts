interface BaseObj {
	id?: string,
	title: string,
	description: string
}

export interface Course extends BaseObj {
	imageUrl: string
	category: string
}

export interface Module extends BaseObj {
	courseId: string
}