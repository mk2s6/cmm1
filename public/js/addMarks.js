
$(function () {

    var check = $('#check');
    var studentDetailContainer = $('#studentDetailContainer');
    var marksContainer = $('#marksContainer');
    let semno;
    let roll_no;
    const confirmTemplate = "<p> Name : {{firstName}}  {{lastName}} </p> " +
                                "<p> Department : {{dept_name}}" +
                                "<p> Email : {{email}} </p>" +
                                "<p>Phone : {{phone}}</p>" +
                                "<p style = 'display : inline'>  Confirm your details : \
                                    <button type='button' data-id='roll_no' id='entMarks' class='mdc-button mdc-button--unelevated mdc-button--dense'>\
                                        <i class='material-icons mdc-button__icon'>done</i>\
                                        Confirm\
                                    </button>\
                                </p>";

    const headTemplate = "\
                            <thead>\
                            <tr>\
                                <th colspan='2'>Semister : {{sem}}</th>\
                                <th colspan='2' id=''>Roll No : {{RollNo}}</th>\
                            </tr>\
                            <tr>\
                                <th>Subject Code</th>\
                                <th>Subject Name</th>\
                                <th>Internal Marks</th>\
                                <th>External Marks</th>\
                            </tr>\
                            </thead>\
                            <tbody id='entry'></tbody>\
                            <tfoot>\
                            <tr>\
                                <td colspan='2'>\
                                    <button type='button' data-id='roll_no' id='updateMarks' class='mdc-button mdc-button--unelevated mdc-button--dense'>\
                                        <i class='material-icons mdc-button__icon'>done</i>\
                                        Update\
                                    </button>\
                                </td>\
                                <td colspan='2'>\
                                    <button type='button' data-id='roll_no' id='nextSem' class='mdc-button mdc-button--unelevated mdc-button--dense'>\
                                        <i class='material-icons mdc-button__icon'>done</i>\
                                        next\
                                    </button>\
                                </td>\
                            </tr>\
                            </tfoot>";

    const subTemplate = "\
                        <tr>\
                        <td name='subId' value='{{subject_id}}' data-type='{{type}}'>{{subject_id}}</td>\
                        <td name='subName' value='{{subject_name}}'>{{subject_name}}</td>\
                        <td>\
                            <select name='internalMarks' class='im' required>\
                                <option value='00'>00</option>\
                                <option value='01'>01</option>\
                                <option value='02'>02</option>\
                                <option value='03'>03</option>\
                                <option value='04'>04</option>\
                                <option value='05'>05</option>\
                                <option value='06'>06</option>\
                                <option value='07'>07</option>\
                                <option value='08'>08</option>\
                                <option value='09'>09</option>\
                                <option value='10'>10</option>\
                                <option value='11'>11</option>\
                                <option value='12'>12</option>\
                                <option value='13'>13</option>\
                                <option value='14'>14</option>\
                                <option value='15'>15</option>\
                                <option value='16'>16</option>\
                                <option value='17'>17</option>\
                                <option value='18'>18</option>\
                                <option value='19'>19</option>\
                                <option value='20'>20</option>\
                                <option value='21'>21</option>\
                                <option value='22'>22</option>\
                                <option value='23'>23</option>\
                                <option value='24'>24</option>\
                                <option value='25'>25</option>\
                                <option value='26'>26</option>\
                                <option value='27'>27</option>\
                                <option value='28'>28</option>\
                                <option value='29'>29</option>\
                                <option value='30'>30</option>\
                            </select>\
                        </td>\
                        <td>\
                            <select name='externalMarks' class='em' required>\
                                <option value='00'>00</option>\
                                <option value='01'>01</option>\
                                <option value='02'>02</option>\
                                <option value='03'>03</option>\
                                <option value='04'>04</option>\
                                <option value='05'>05</option>\
                                <option value='06'>06</option>\
                                <option value='07'>07</option>\
                                <option value='08'>08</option>\
                                <option value='09'>09</option>\
                                <option value='10'>10</option>\
                                <option value='11'>11</option>\
                                <option value='12'>12</option>\
                                <option value='13'>13</option>\
                                <option value='14'>14</option>\
                                <option value='15'>15</option>\
                                <option value='16'>16</option>\
                                <option value='17'>17</option>\
                                <option value='18'>18</option>\
                                <option value='19'>19</option>\
                                <option value='20'>20</option>\
                                <option value='21'>21</option>\
                                <option value='22'>22</option>\
                                <option value='23'>23</option>\
                                <option value='24'>24</option>\
                                <option value='25'>25</option>\
                                <option value='26'>26</option>\
                                <option value='27'>27</option>\
                                <option value='28'>28</option>\
                                <option value='29'>29</option>\
                                <option value='30'>30</option>\
                                <option value='31'>31</option>\
                                <option value='32'>32</option>\
                                <option value='33'>33</option>\
                                <option value='34'>34</option>\
                                <option value='35'>35</option>\
                                <option value='36'>36</option>\
                                <option value='37'>37</option>\
                                <option value='38'>38</option>\
                                <option value='39'>39</option>\
                                <option value='40'>40</option>\
                                <option value='41'>41</option>\
                                <option value='42'>42</option>\
                                <option value='43'>43</option>\
                                <option value='44'>44</option>\
                                <option value='45'>45</option>\
                                <option value='46'>46</option>\
                                <option value='47'>47</option>\
                                <option value='48'>48</option>\
                                <option value='49'>49</option>\
                                <option value='50'>50</option>\
                                <option value='51'>51</option>\
                                <option value='52'>52</option>\
                                <option value='53'>53</option>\
                                <option value='54'>54</option>\
                                <option value='55'>55</option>\
                                <option value='56'>56</option>\
                                <option value='57'>57</option>\
                                <option value='58'>58</option>\
                                <option value='59'>59</option>\
                                <option value='60'>60</option>\
                                <option value='61'>61</option>\
                                <option value='62'>62</option>\
                                <option value='63'>63</option>\
                                <option value='64'>64</option>\
                                <option value='65'>65</option>\
                                <option value='66'>66</option>\
                                <option value='67'>67</option>\
                                <option value='68'>68</option>\
                                <option value='69'>69</option>\
                                <option value='70'>70</option>\
                            </select>\
                        </td>\
                    </tr>";

    const objectiveTemplate = "\
                    <tr>\
                    <td name='subId' value='{{subject_id}}' data-type='{{type}}'>{{subject_id}}</td>\
                    <td name='subName' value='{{subject_name}}'>{{subject_name}}</td>\
                    <td>\
                        <select name='internalMarks' class='im' required>\
                            <option value='00'>00</option>\
                        </select>\
                    </td>\
                    <td>\
                        <select name='externalMarks' class='em' required>\
                            <option value='00'>00</option>\
                            <option value='01'>01</option>\
                            <option value='02'>02</option>\
                            <option value='03'>03</option>\
                            <option value='04'>04</option>\
                            <option value='05'>05</option>\
                            <option value='06'>06</option>\
                            <option value='07'>07</option>\
                            <option value='08'>08</option>\
                            <option value='09'>09</option>\
                            <option value='10'>10</option>\
                            <option value='11'>11</option>\
                            <option value='12'>12</option>\
                            <option value='13'>13</option>\
                            <option value='14'>14</option>\
                            <option value='15'>15</option>\
                            <option value='16'>16</option>\
                            <option value='17'>17</option>\
                            <option value='18'>18</option>\
                            <option value='19'>19</option>\
                            <option value='20'>20</option>\
                            <option value='21'>21</option>\
                            <option value='22'>22</option>\
                            <option value='23'>23</option>\
                            <option value='24'>24</option>\
                            <option value='25'>25</option>\
                            <option value='26'>26</option>\
                            <option value='27'>27</option>\
                            <option value='28'>28</option>\
                            <option value='29'>29</option>\
                            <option value='30'>30</option>\
                            <option value='31'>31</option>\
                            <option value='32'>32</option>\
                            <option value='33'>33</option>\
                            <option value='34'>34</option>\
                            <option value='35'>35</option>\
                            <option value='36'>36</option>\
                            <option value='37'>37</option>\
                            <option value='38'>38</option>\
                            <option value='39'>39</option>\
                            <option value='40'>40</option>\
                            <option value='41'>41</option>\
                            <option value='42'>42</option>\
                            <option value='43'>43</option>\
                            <option value='44'>44</option>\
                            <option value='45'>45</option>\
                            <option value='46'>46</option>\
                            <option value='47'>47</option>\
                            <option value='48'>48</option>\
                            <option value='49'>49</option>\
                            <option value='50'>50</option>\
                            <option value='51'>51</option>\
                            <option value='52'>52</option>\
                            <option value='53'>53</option>\
                            <option value='54'>54</option>\
                            <option value='55'>55</option>\
                            <option value='56'>56</option>\
                            <option value='57'>57</option>\
                            <option value='58'>58</option>\
                            <option value='59'>59</option>\
                            <option value='60'>60</option>\
                            <option value='61'>61</option>\
                            <option value='62'>62</option>\
                            <option value='63'>63</option>\
                            <option value='64'>64</option>\
                            <option value='65'>65</option>\
                            <option value='66'>66</option>\
                            <option value='67'>67</option>\
                            <option value='68'>68</option>\
                            <option value='69'>69</option>\
                            <option value='70'>70</option>\
                            <option value='71'>71</option>\
                            <option value='72'>72</option>\
                            <option value='73'>73</option>\
                            <option value='74'>74</option>\
                            <option value='75'>75</option>\
                            <option value='76'>76</option>\
                            <option value='77'>77</option>\
                            <option value='78'>78</option>\
                            <option value='79'>79</option>\
                            <option value='80'>80</option>\
                            <option value='81'>81</option>\
                            <option value='82'>82</option>\
                            <option value='83'>83</option>\
                            <option value='84'>84</option>\
                            <option value='85'>85</option>\
                            <option value='86'>86</option>\
                            <option value='87'>87</option>\
                            <option value='88'>88</option>\
                            <option value='89'>89</option>\
                            <option value='90'>90</option>\
                            <option value='91'>91</option>\
                            <option value='92'>92</option>\
                            <option value='93'>93</option>\
                            <option value='94'>94</option>\
                            <option value='95'>95</option>\
                            <option value='96'>96</option>\
                            <option value='97'>97</option>\
                            <option value='98'>98</option>\
                            <option value='99'>99</option>\
                            <option value='100'>100</option>\
                        </select>\
                    </td>\
                </tr>";
    const auditTemplate = "\
                <tr>\
                <td name='subId' value='{{subject_id}}' data-type='{{type}}'>{{subject_id}}</td>\
                <td name='subName' value='{{subject_name}}'>{{subject_name}}</td>\
                <td>\
                    <select name='internalMarks' class='im' required>\
                        <option value='00'>00</option>\
                        <option value='01'>01</option>\
                        <option value='02'>02</option>\
                        <option value='03'>03</option>\
                        <option value='04'>04</option>\
                        <option value='05'>05</option>\
                        <option value='06'>06</option>\
                        <option value='07'>07</option>\
                        <option value='08'>08</option>\
                        <option value='09'>09</option>\
                        <option value='10'>10</option>\
                        <option value='11'>11</option>\
                        <option value='12'>12</option>\
                        <option value='13'>13</option>\
                        <option value='14'>14</option>\
                        <option value='15'>15</option>\
                        <option value='16'>16</option>\
                        <option value='17'>17</option>\
                        <option value='18'>18</option>\
                        <option value='19'>19</option>\
                        <option value='20'>20</option>\
                        <option value='21'>21</option>\
                        <option value='22'>22</option>\
                        <option value='23'>23</option>\
                        <option value='24'>24</option>\
                        <option value='25'>25</option>\
                        <option value='26'>26</option>\
                        <option value='27'>27</option>\
                        <option value='28'>28</option>\
                        <option value='29'>29</option>\
                        <option value='30'>30</option>\
                    </select>\
                </td>\
                <td>\
                    <select name='externalMarks' class='em' required>\
                        <option value='00'>00</option>\
                    </select>\
                </td>\
            </tr>";
                
    check.on('click', function(event) {
        event.preventDefault();
        studentDetailContainer.html("");
        marksContainer.html("");
        var id = $('#' + $(this).attr('data-id'));
        id = id.val();
        roll_no = id;
        if(id != "") {
            $.ajax({
                url: '/confirm/'+ id,
                type: 'GET',
                dataType: 'json',
                success : function (res) {
                    if (res.confirm.length !== 0) {
                        display(res.confirm[0]);
                    } else {
                        alert("Check your details");
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
    function display (confirm) {
    	studentDetailContainer.html(Mustache.render(confirmTemplate, confirm));
    }

    studentDetailContainer.delegate('#entMarks', 'click', function(event){
        event.preventDefault;
        semno = 1;
        enterMarks(semno);
    });

    marksContainer.delegate('#nextSem', 'click', function (event) {
        event.preventDefault;
        semno++;
        if(semno > 7) {
            alert('There are only 7 semisters in the record');
            $(this).attr('disabled' , 'true');
            window.location.reload(true);
        } else
            enterMarks(semno);
    });

    marksContainer.delegate('#updateMarks', 'click' , function (event) {
        event.preventDefault;
        var subjects = $(this).parents('#marksContainer').find('td[name=subId]');
        var im = $(this).parents('#marksContainer').find('select[name=internalMarks]');
        var em = $(this).parents('#marksContainer').find('select[name=externalMarks]');
        var marks = [];
        $.each(subjects, function (i, subject) {
            marks.push({
                subject_id : $(subject).attr('value'),
                im : $(im[i]).val(),
                em : $(em[i]).val(),
                type :  $(subject).attr('data-type')
            });
        });
        console.log(marks);
        $.ajax({
            method : 'POST',
            url : '/postMarks/'+roll_no+'/'+semno,
            contentType: 'application/json',
            data : JSON.stringify(marks),
            success : function (res) {
                alert(res.msg);
                $('#nextSem').click();
            }, 
            error : function (e, ts, et) {
                    console.log("some error" + ts + et);
            }
        });
    });

    function enterMarks(sem) {
        marksContainer.html('');
        var headReq = {
            RollNo : roll_no,
            sem : sem
        }
        $.ajax({
            url: '/subjects/'+sem,
            method : 'GET',
            contentType : 'application/json',
            success : function (res) {
                marksContainer.html(Mustache.render(headTemplate, headReq));
                var entry = $('#entry');
                appendSub(entry, res.subjects);
            },
            error : function (e, ts, et) {
                console.log("some error" + ts + et);
            }
        });
    }

    function appendSub(entry, subs) {
        $.each(subs, function(i, sub){
            if (sub.type != 'OBJECTIVE' && sub.type != 'AUDIT')
                entry.append(Mustache.render(subTemplate, sub))
            else if(sub.type == 'OBJECTIVE')
                    entry.append(Mustache.render(objectiveTemplate, sub))
                else  if(sub.type == 'AUDIT')
                    entry.append(Mustache.render(auditTemplate, sub))
        });
    }
});
