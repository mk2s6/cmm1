$(function () {

    const list = $('#list');
    const meritTemplate = "\
                        <tr>\
                            <td>{{sno}}</td>\
                            <td>{{mark.RollNo}}</td>\
                            <td>{{mark.name}}</td>\
                            <td>{{mark.points}}</td>\
                            <td>{{mark.percentage}}</td>\
                            <td>{{mark.grade}}</td>\
                            <td>{{mark.grade}}</td>\
                        </tr>";
    $(window).on('load', function(event){
        event.preventDefault;
        $.ajax({
            url : '/meritList/3',
            method : 'GET',
            dataType : 'json',
            async : false,
            success: function(res) {
                appendList(res.marks);
            },
            error : function (e, ts, et) {
                console.log("some error" + ts + et);
            }            
        });
    });


    function appendList(marks) {
        list.html('');
        $.each(marks, function (i, mark) {
            list.append(Mustache.render(meritTemplate, {sno : i+1, mark : mark}));
        });
    }
})