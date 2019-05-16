var express =  require('express');
var router = express.Router();
var parser = require('body-parser');
var $ = require('jquery');
const db = require('../dbconfig.js');

router.use(parser.json());

router.get('/', function(req, res) {
	  res.render('index.hbs', { title: 'CMM' });
});

router.get('/addMarks', function(req, res) {
	res.render('addMarks', {title : 'Add Marks to the Database'});
});

router.get('/getMarks', function(req, res) {
	res.render('getMarks', { title : 'Marks List'});
});

router.get('/getMarks/:id/:semnum', function(req, res){
	var roll_no = req.params.id;
	var semnum = req.params.semnum;

		var q = "SELECT r15sub.subject_id, subject_name, im, em, total, pf, points, grade \
			FROM marks right join r15sub on marks.subject_id = r15sub.subject_id \
			where roll_no = '"+roll_no+"' AND semnum = '"+semnum+"'\
			ORDER by sno ASC";
	query = db.query(q,function(err, results){
		if(err) {
			console.log(err);;
			res.send(err)
		} else {
			var str = JSON.stringify(results);
			var json = JSON.parse(str);
			res.send({marks : json});
		}
	});
	db.close;
});

router.get('/meritList', function (req, res) {
	res.render('meritList', {title : "Merit List"});
});

router.get('/meritList/:semnum', function (req, res) {
	var semnum = req.params.semnum;
		var q = "\
				SELECT \
				student.roll_no AS RollNo,\
				CONCAT(firstName, lastName) AS name,\
				points,\
				percentage,\
				pf,\
				grade\
			FROM\
				student,\
				cgpa\
			WHERE\
				student.roll_no = cgpa.roll_no AND\
				year_id = "+ semnum +"\
			ORDER BY percentage DESC;\
		";
	query = db.query(q, function(err, results){
		if (err) {
			console.log(err);
		} else {
			var str = JSON.stringify(results);
			var json = JSON.parse(str);
			console.log(json);
			res.send({marks : json});	
		}
	});
	db.close;
});

router.get('/getSGPA/:id/:semnum',function (req, res) {
		var roll_no = req.params.id;
	var semnum = req.params.semnum;
	var q = "\
			SELECT points as sgpa, percentage, pf, grade\
			FROM sgpa\
			WHERE roll_no = '"+roll_no+"' AND semnum = "+semnum;
	query = db.query(q, function(err, results){
		if (err) {
			console.log(err);
		} else {
			var str = JSON.stringify(results);
			var json = JSON.parse(str);
			res.send({marks : json});	
		}
	});
	db.close;
})


router.get('/getTotal/:id', function (req, res) {
	var roll_no = req.params.id;
		var q = "\
			SELECT * \
			FROM cgpa\
			WHERE roll_no = '"+ roll_no +"'";
	query = db.query(q, function (err, results, fields) {
		var str = JSON.stringify(results);
		var json = JSON.parse(str);			
		res.send({marks: json});
	});
});

router.get('/getNumSem/:id', function(req, res){
	var roll_no = req.params.id;
		var q = "SELECT count(distinct semnum) as numsem \
			FROM marks right join r15sub on marks.subject_id = r15sub.subject_id \
			where roll_no='" + roll_no +"'";
	query = db.query(q, function(err, results){
		if (err) {
			console.log(err);
			res.send({type: 'error', error : err});
		} else {
			var str = JSON.stringify(results);
			var json = JSON.parse(str);					
			res.send({type: 'success', numsem : json[0].numsem});
		}
	});	
});

router.get('/confirm/:id', function (req, res) {
	
		var id = req.params.id;
		
	var q = 'SELECT firstName, lastName, dept_name, email, phone  FROM student , departments WHERE roll_no = \'' + id + '\' AND student.dept_id = departments.dept_id';
	query = db.query(q, function (err, result) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			var str = JSON.stringify(result);
			var json = JSON.parse(str);
			res.send({confirm : json})
		}
	});
	db.close;
});

router.get('/subjects/:sem', function (req, res) {
	const sem = parseInt(req.params.sem);
	
	var q = 'SELECT sno, subject_id, subject_name, type FROM r15sub WHERE semnum ='+sem + ' ORDER BY sno ASC';
	query = db.query(q, function (err, result) {
		if(err) {
			console.log(err);
			res.send(err);
		} else {
			var str = JSON.stringify(result);
			var json = JSON.parse(str);
			res.json({subjects : json})
		}
	})
	db.close;
});

router.post('/postMarks/:id/:semnum', function (req, res) {
	const marks = req.body;
	const roll_no = req.params.id;
	const semnum = req.params.semnum;
	
	marks.forEach(function(mark, i){
	
		let im = parseInt(mark.im);
		let em = parseInt(mark.em);
		let total = im + em;
		let pf = (mark.type == 'AUDIT')? (im >= 12)? 'P' : 'F' : (em < 25 || total < 40)? 'F' : 'P';
		let points = (pf == 'F')? 0 :((total == 100)? 10 : ((Math.floor(total/10)) == 4 )? 4 : (Math.floor(total/10)+1));
		let grade = gradeGenerator(points);
		var tot = 0;
		tot = tot + total;
	
		let markArray = [
			roll_no,
			mark.subject_id,
			im,
			em,
			total,
			pf,
			points,
			grade
		];
		query = db.query("INSERT INTO marks (roll_no, subject_id, im, em, total, pf, points, grade) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ", markArray, function (err, result) {
			if (err) {
				console.log(err);
				return err;
			} else {
				if(i+1 == marks.length) {
					calcSGPA(roll_no, semnum);
					res.send({msg : 'Marks Updated in database'});
				}
			}
		});	
	});
	db.close;
});

function gradeGenerator(credit) {
	switch(credit) {
		case 10 :
			return 'S';
		case 9 :
			return 'E';
		case 8 :
			return 'A';
		case 7 :
			return 'B';
		case 6 :
			return 'C';
		case 5 :
			return 'D';
		case 4 : 
			return 'E';
		default :
			return 'F';
	}
}

function calcSGPA(roll_no, semnum) {
		var q = "SELECT college.r15sub.semnum, roll_no, SUM(noc) as tc, (SUM(points * noc) / SUM(noc)) AS sgpa, sum(total)/count(*) AS per \
			FROM marks, r15sub, points\
			WHERE marks.roll_no = '"+ roll_no +"' AND marks.subject_id = r15sub.subject_id AND r15sub.type = points.type AND r15sub.semnum = " + semnum+" AND r15sub.type != 'AUDIT'"; 	
	query = db.query(q, function (err, results) {
		if(err) console.log(err);
		else {
			var str =  JSON.stringify(results[0]);
			var json = JSON.parse(str);
			var pf;

			query = db.query("SELECT * FROM marks, r15sub WHERE pf SOUNDS LIKE 'F' AND marks.roll_no = '"+json.roll_no+"' AND marks.subject_id = r15sub.subject_id and r15sub.semnum = " + json.semnum, function(err, result){
				if (err) {
					console.log(err);
				} else {
					if(result.length === 0) pf = 'P';
					else pf = 'F';
					var points = (pf === 'F') ? 0 : Math.round(json.sgpa * 100)/100;
					var grade = gradeGenerator(Math.floor(points));
					var percentage = Math.round(json.per * 100)/100;

					var sgpa = [
						json.roll_no,
						json.semnum,
						json.tc,
						pf,
						points,
						percentage,
						grade
					];
					query = db.query("INSERT INTO sgpa (roll_no, semnum, tc, pf, points,percentage, grade) VALUES (?, ? , ?, ?, ?, ?, ?)", sgpa, function (err, result) {
						if(err) console.log(err);
						else { 
							console.log("Sgpa entered for " + json.roll_no + " and sem " + json.semnum);
							if(semnum == 7) {
								calcCGPA(roll_no);
							}
						}
					});
				}
			});
		}
	});
	db.close;
}

function calcCGPA(roll_no){
		var q = "SELECT roll_no, sum( tc * points)/sum(tc) as cgpa, sum(percentage)/count(*) as percentage FROM college.sgpa where roll_no = '" + roll_no +"'";
	query = db.query(q, function (err, results, fields) {
		if (err) {
			console.log(err);
		}else {
			var str =  JSON.stringify(results[0]);
			var json = JSON.parse(str);
			var pf;
			query = db.query("SELECT * FROM sgpa WHERE pf SOUNDS LIKE 'F' AND sgpa.roll_no = '"+json.roll_no+"'", function(err, result){
				if (err) {
					console.log(err);
				} else {
					if(result.length === 0) pf = 'P';
					else pf = 'F';
					var points = (pf === 'F') ? 0 : Math.round(json.cgpa * 100)/100;
					var grade = gradeGenerator(Math.floor(points));
					var percentage = Math.round(json.percentage * 100)/100;
					var cgpa = [
						roll_no,
						points,
						percentage,
						pf,
						grade
					];
					query = db.query("INSERT INTO cgpa (roll_no, points, percentage, pf, grade) VALUES (?, ?, ?, ?, ?)", cgpa, function (err, res, fields) {
						if (err) {
							console.log(err);
						} else {
							console.log("Cgpa entered for " + roll_no);
						}
					});
				}
			});
		}
	})	
}
// calcCGPA('15381A0518');
module.exports = router;