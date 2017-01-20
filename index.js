class Car {
			constructor(name = "湘LNB326", height = 1.5, width = 1.8){
				this.name = name
				this.height = height
				this.width = width
			}
		}

		class Audi extends Car {}

		let audi = new Audi()