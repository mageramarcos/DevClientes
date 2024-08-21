type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

type CustomOmit<T, U extends keyof T> = {
	[K in keyof T as K extends U ? never : K]: T[K]
}

type Require<T, U extends keyof T> = { [P in U]-?: T[P] } & T

export {
	AtLeastOne,
	CustomOmit,
	Require
}