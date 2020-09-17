function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

$('input[type="checkbox"]').on('change', function () {
    this.value ^= 1;
});

window.addEventListener('load', () => {
    $('#timezone').val(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const input_time = $('.convert-timezone');
    if (input_time.length && !input_time.val()) {
        let date;
        date = new Date();
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        date.setMilliseconds(null);
        date.setSeconds(null);
        input_time.val(date.toISOString().slice(0, -8));
    }
});

$('.role').on('change', function () {
    let user = $(this).data('user');
    $('#edit-' + user + ' .role').val($(this).val());
    $('#edit-' + user).submit()
});

function randomPassword(length) {
    let psw = '';
    let chars = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890';
    for (let i = 0; i < length; i++) {
        psw += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return psw;
}

$('#toggle-password').on('click', function () {
    $(this).toggleClass('fa-eye fa-eye-slash');
    let new_password = $('#new_password');
    'password' === new_password.attr('type') ? new_password.attr('type', 'text') : new_password.attr('type', 'password');
});

$('#generate-password').on('click', function () {
    let new_password = $('#new_password');
    new_password.val(randomPassword(16));
    'password' === new_password.attr('type') && $('#toggle-password').click();
    new_password.select();
});


// Assign comics to user section
var assignedComics = [];

function assignComics() {
    let user_id = $("#modal-assign h4").data('user');
    let comics = $('#assigned-comics .comics .comic').map(function () {
        return $(this).data('comic');
    }).get();

    $.ajax({
        type: 'PATCH',
        url: '/admin/users/' + user_id + '/comics',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        },
        data: {'comics': comics},
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        },
        complete: function () {
            $("#modal-assign").modal('hide');
        }
    });
    location.reload();
}

function pushComic(comic_id, comic_name) {
    $('#comic-search').val('');
    assignedComics[comic_id] = comic_name;
    assignComicsBuild();
}

function deleteComic(comic_id) {
    delete(assignedComics[comic_id]);
    assignComicsBuild();
}

function assignComicsBox(user, comics) {
    event.preventDefault();
    let modalContainer = $("#modal-assign");
    modalContainer.find('h4').html('Assign comics to ' + user.name).attr('data-user', user.id);
    assignedComics = [];
    if (comics.length) {
        comics.forEach(function (comic) {
            assignedComics[comic.pivot.comic_id] = comic.name
        });
    }
    assignComicsBuild();
    modalContainer.modal({show: true, closeOnEscape: true, backdrop: 'static', keyboard: true});
}

function assignComicsBuild() {
    let assigned_comics_html = '<div class="comics">';
    for(let i=1; i < assignedComics.length; i++) {
        if(assignedComics[i] !== undefined) assigned_comics_html += '<span data-comic="' + i +
            '" class="comic badge badge-info p-2 text-white mr-2 cursor-pointer" onclick="deleteComic(' + i + ')">' +
            assignedComics[i] + ' <span class="fas fa-times-circle fa-fw"></span></span>';
    }
    assigned_comics_html += '</div>';
    $('#assigned-comics').html(assigned_comics_html);
}



$(document).ready(function () {
    let comic_search = $('#comic-search');
    let results_box = $('#results-box');
    comic_search.on('input', function () {
        results_box.hide();
        results_box.html();
        if ($(this).val().length < 3) return;
        $.ajax({
            type: 'POST',
            url: '/admin/comics/search/' + encodeURI($(this).val()),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            beforeSend: function () {
                comic_search.css('background', 'url("../img/loading.gif") 92% 7px /24px no-repeat rgb(255, 255, 255)');
            },
            success: function (data) {
                let res = '<ul>';
                if (data['comics'].length === 0) {
                    res += '<li>No results</li>';
                } else {
                    data['comics'].forEach(function (comic) {
                        let name = escapeHtml(comic.name);
                        let id = escapeHtml('' + comic.id);
                        res += '<li class="border-bottom" onclick="pushComic(\'' + id + '\', \'' + name + '\')">' +
                            name + '</li>';
                    });
                }
                res += '</ul>';
                results_box.html(res);
            },
            error: function () {
                results_box.html('<ul><li><div>No results</div></li></ul>');
            },
            complete: function () {
                comic_search.css('background', '');
                results_box.show();
            }
        });
    });

    comic_search.focusout(function () {
        results_box.fadeOut();
    });

});
