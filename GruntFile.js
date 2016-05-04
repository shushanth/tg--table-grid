module.exports = function(grunt){

	grunt.initConfig({


		//sass to css
		sass:{
			dist:{
				files:{
					'styles/main.css':'styles/main.scss'
				}
			}
		},


		watch:{
			files:['styles/*.scss'],
			tasks:['sass'],
			options:{
				livereload: true,
			}
		}

	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');



};
