$(document).ready(function() {
    $('.parallax').parallax();
    $('.collapsible').collapsible();
    $('.modal').modal();
    console.log("hello");

    $(".save-btn").on("click", function (event) {
    	event.preventDefault();
    	
    	var id = $(this).attr("artId");
    	console.log(id);

    	$.ajax({
    		type : "PUT",
    		url : `/api/save-article`,
    		data : {id : id},
    		success : function (data) {
    			Materialize.toast('Saved', 1500, "blue darken-4");
    			$(`#${id}`).remove();

    		}
    	});

    });

    $(".delete-btn").on("click", function (event) {
    	event.preventDefault();
    	
    	var id = $(this).attr("artId");
    	console.log(id);

    	$.ajax({
    		type : "PUT",
    		url : `/api/unsave-article`,
    		data : {id : id},
    		success : function (data) {
    			Materialize.toast('Delete From Saved', 1500, "orange darken-1");
    			$(`#${id}`).remove();
    			

    		}
    	});
    });

    $(".add-btn").on("click", function (event) {
    	var id = $(this).attr("artId");
    	console.log(id);
        $.ajax({
            type : "GET",
            url : `/api/article-notes/${id}`,
            data : {id : id},
            success : function (data) {
                console.log(data);
                modalRows(data.note, id);
                $("#save-note-btn").attr("artId", id);
                $("#modal1").modal("open");
            }
        });
    	
    });

    $("#save-note-btn").on("click", function (event) {
        var id = $(this).attr("artId");
        console.log($("#note").val().trim());
        $.ajax({
            type : "PUT",
            url : `/api/save-notes`,
            data : {
                id : $(this).attr("artId"),
                note : $("#note").val().trim()
            },
            success : function (data) {
                modalRows(data.note, id);     
                
            }
        });
        
    });


});


function modalRows(data, id) {
    var list = $("#modal-content-id");
    list.empty();
    var ul = $("<ul>").addClass("collection");

    for (var i in data) {
        var item = $("<li>").addClass("collection-item avatar").attr("id", i);
        var icon = $("<i>").addClass("material-icons circle").html("folder");
        var span = $("<p>").text(data[i]);
        var deleteIcon = $("<a>", {
            on : {
                click : function () {
                    $.ajax({
                        method: "PUT",
                        url: `/api/delete-notes`,
                        data: {
                            note : data[i],
                            id: id
                        }
                    }).done(function (data) {
                        $(`#${i}`).remove();
                        Materialize.toast('Note Deleted', 1500, "orange darken-1");
                        $("#modal1").modal("close");
                    });
                }
            }
        }).addClass("secondary-content btn").append($("<i>").addClass("medium material-icons red-text").html("delete_sweep"));

        item.append(icon).append(span).append(deleteIcon);
        ul.append(item);
    }
    list.append(ul);
}


