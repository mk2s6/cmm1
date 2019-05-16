$(function () {
    var check = $('#check');
    var tableContainer = $('#tableContainer');
    let roll_no;
    const getMarksForm = $('#getMarksForm');
    getMarksForm.on('submit', function (event) {
        event.preventDefault();
        check.click();
        return false;
    });
    const tableTemplate = "\
                        <table id='table-{{semnum}}' class='marksContainer'>\
                            <thead>\
                            <tr>\
                                <th colspan='4'>Semister : {{semnum}}</th>\
                                <th colspan='4' id=''>Roll No : {{RollNo}}</th>\
                            </tr>\
                            <tr>\
                                <th>Subject Code</th>\
                                <th>Subject Name</th>\
                                <th>Internal Marks</th>\
                                <th>External Marks</th>\
                                <th>Total</th>\
                                <th>Pass/Fail</th>\
                                <th>Credits</th>\
                                <th>Grade</th>\
                            </tr>\
                            </thead>\
                            <tbody id='body-{{semnum}}'></tbody>\
                            <tfoot id='footer-{{semnum}}'></tfoot>\
                        </table>";

    const bodyTemplate = "\
                            <tr>\
                                <td>{{subject_id}}</td>\
                                <td>{{subject_name}}</td>\
                                <td>{{im}}</td>\
                                <td>{{em}}</td>\
                                <td>{{total}}</td>\
                                <td>{{pf}}</td>\
                                <td>{{points}}</td>\
                                <td>{{grade}}</td>\
                            </tr>\
                            ";
    const footerTemplate = "\
                                <tr>\
                                    <td colspan='2'>\
                                        SGPA : {{sgpa}}\
                                    </td>\
                                    <td colspan='2'>\
                                        Percentage : {{percentage}}\
                                    </td>\
                                    <td colspan='2'>\
                                        Pass/Fail : {{pf}}\
                                    </td>\
                                    <td colspan='2'>\
                                        Grade : {{grade}}\
                                    </td>\
                                </tr>\
                                ";

    const cgpaTemplate = "\
            <p>CGPA : {{points}}</p>\
            <p>Percentage : {{percentage}}</p>\
            <p>Pass/fail : {{pf}}</p>\
            <p>Grade : {{grade}}</p>\
                        ";
    check.on('click', function(event) {
        event.preventDefault();
        tableContainer.html('');
        var id = $('#' + $(this).attr('data-id'));
        id = id.val();
        roll_no = id;
        if(id != "") {
            $.ajax({
                url : '/getNumSem/'+roll_no,
                type: 'GET',
                async: false,
                dataType : 'json',
                success : function(res) {
                    if(res.type != 'error') {
                        getmarks(roll_no, res.numsem);
                    }                        
                },
                error : function (e, ts, et) {
                    console.log("some error" + ts + et);
                }               
            }); 
        } else {
            alert("Missing Credentials");
        }
    });

    function getmarks(id, numsem) {
        alert("id : " + id + "\n semnum : " + numsem);
        for(var i = 1 ; i <= numsem ; i++) {
            tableContainer.append(Mustache.render(tableTemplate, {semnum : i, RollNo : id}));
            var btId = $('#body-'+i);
            var ftId = $('#footer-'+i)
            // console.log(btId);
            $.ajax({
                url: '/getMarks/'+ id + '/' + i,
                type: 'GET',
                async : false,
                dataType: 'json',
                success : function (res) {
                    if (res.marks.length !== 0) {
                        appendBody(btId, res.marks);
                        appendFooter(ftId, id, i);
                        if (i === numsem) {
                            gettotal(id);
                        }
                    } else {
                        alert("Check Roll_No or contact the administrator");
                    }
                }, 
                error : function (e, ts, et) {
                        console.log("some error" + ts + et);
                }
            });
        }
    }

    function gettotal(id) {
        $.ajax({
            url: '/getTotal/'+ id,
            type: 'GET',
            async: false,
            dataType: 'json',
            success : function (res) {
                if (res.marks.length !== 0) {
                    $('#cgpaContainer').html(Mustache.render(cgpaTemplate, res.marks[0]))
                } else {
                    alert("Check roll no or contact the administrator");
                }
            }, 
            error : function (e, ts, et) {
                    console.log("some error" + ts + et);
            }
        });
    }

    function appendBody(btId, marks) {
        $.each(marks, function (i, mark) {
            btId.append(Mustache.render(bodyTemplate, mark));
        });
    }


    function appendFooter(ftId, id, i) {
        $.ajax({
            url: '/getSGPA/'+ id +'/'+i,
            type: 'GET',
            async : false,
            dataType: 'json',
            success : function (res) {
                if (res.marks.length !== 0) {
                    ftId.html(Mustache.render(footerTemplate, res.marks[0]));
                } else {
                    alert("Check roll no or contact the administrator");
                }
            }, 
            error : function (e, ts, et) {
                    console.log("some error" + ts + et);
            }
        });
    }
});