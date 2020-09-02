// Update attribute of the current canvas object
function setValue(key, value) {
    if (canvas.getActiveObject() != null) {
        var activeText = canvas.getActiveObject()
        activeText.set(key, value)
        canvas.renderAll();
    }
}

// Return current background color
function getBackgroundColor(color) {
    if ($('#bg-option').hasClass('active')) {
        return color
    } else {
        return ''
    }
}

function disableTextMethods() {
    $('.text-method').attr('disabled', 'disabled')
    $('#font-family').selectpicker('refresh')
    $('.align').addClass('disabled')
    $.each($('.cp'), function (i, cp) {
        ($(cp).colorpicker('colorpicker')).disable()
    })
}

function enableTextMethods() {
    $('.text-method').attr('disabled', false)
    $('#font-family').selectpicker('refresh')
    $('.align').removeClass('disabled')
    $.each($('.cp'), function (i, cp) {
        ($(cp).colorpicker('colorpicker')).enable();
    })
}

function createShadow(color, width) {
    return `${color} 0px 0px ${width}`
}

function setBackgroundColor(color) {
    setValue("textBackgroundColor", getBackgroundColor(color))
}

function isImage(fileType) {
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (validImageTypes.includes(fileType)) {
        return true
    }
    return false
}

// Generate a random 6-character name
function createImgName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `${result}.png`;
}

// Show alert message
function showAlert(message) {
    $('.alert-container')
        .html(`<p class="text-center mb-0"><strong>${message}</strong></p>`)
        .fadeIn('normal', function () {
            setTimeout(function () {
                $('.alert-container').fadeOut('normal', function () {
                    $('.alert-container').html('')
                })
            }, 3000)
        })
}