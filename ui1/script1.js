
$(document).ready(function(){
 $('#button').on('click',function(){
        getdetails();
     });
     $("#add-doctor").on('click',function()
     {
        var $doctor=$('#dname');
        var $patient=$('#patient');
        var $status=$('#status');

        var appointdataa={
            doctor:$doctor.val(),           
            patient:$patient.val(),
            status:$status.val(),
        };
        adddoctor(appointdataa)
        

     });

     $("#deletedetails").on('click',function(){
       
        deletedetails()
        
     });

     $("#update").on('click',function(){
        var $updatedoctor=$('#updatedoctor');
        var $updatepatient=$('#updatepatient');
        var $updatestatus=$('#updatestatus');

        var appointdata={
            doctor:$updatedoctor.val(),
            patient:$updatepatient.val(),
            status:$updatestatus.val()
        };
        updatedetails(appointdata)


     });



     
   
    });

    function getdetails(){
        var $id=$('#list');
        $.ajax({
            type:"GET",
            url:"http://localhost:8080/appoint/webresources/appoint/details",
            success:function (id){
                console.log(id);
                $.each(id.appointment,function(i,appointment){
                    $id.append('<li>Hospital:doctor:'+appointment.doctor+',Patient:'+appointment.patient+',Status:'+appointment.status+'</li>')
                });
            }


        });
    }

   







   function adddoctor(appointdataa){
    let $detail = $('#doctors');
    var data = appointdataa;


    $.ajax({
        contentType:"application/json; charset=UTF-8",
        url:"http://localhost:8080/appoint/webresources/appoint/insert",
        type:'POST',
        datatype:'json',
        data:JSON.stringify(data),
        success:function (){
            $detail.append("<li>details : doctor:"+appointdataa.doctor+"patient:"+appointdataa.patient+"status:"+appointdataa.status+"</li>");
            alert('details added successfully')
        },
        error:function(){
            alert("Error inserting details")
        }
   });
}





function deletedetails(){
 

      var doctorname= document.getElementById('deletedoctor').value;
       console.log(doctorname);
     
    $.ajax({
    type:"DELETE",
    url:"http://localhost:8080/appoint/webresources/appoint/delete/"+doctorname,
    success:alert("details "+doctorname+" deleted")

    });
}

function updatedetails(appointdata){

    let $appoint=$('updatedetails');
    var details=appointdata;
   var doctorname= document.getElementById("updatedoctor").value;
   console.log(doctorname);
    $.ajax({
    contentType:"application/json; charset=UTF-8",
    url:"http://localhost:8080/appoint/webresources/appoint/update/"+doctorname,
    type:"PUT",
    data:JSON.stringify(details),
    success:function (){
        $appoint.append("<li>details : doctor:"+appointdata.doctor+"patient:"+appointdata.patient+"status:"+appointdata.status+"</li>");
        alert('details updated successfully')
    },
    error:function(){
        alert("Error updating details")
    }
});
}

