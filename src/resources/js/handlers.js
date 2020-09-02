// Handle custom fonts
function loadFont(font) {
    const customFonts = ['Arial Black', 'Comic Sans Ms', 'Impact', 'Trebuchet MS', 'Bahij Myriad Arabic Bold', 'Hacen Liner XXL']
    var text = canvas.getActiveObject()
    if (customFonts.includes(font)) {
        var myfont = new FontFaceObserver(font)
        myfont.load().then(function () {
            text.set("fontFamily", "");
            text.set("fontFamily", font);
            canvas.renderAll();
            $('#font-family').selectpicker('refresh')
        })
    } else {
        text.set("fontFamily", font);
        canvas.renderAll();
        $('#font-family').selectpicker('refresh')
    }
}

// Update edit methods values to the selected canvas text
function updateInputs() {
    var activeObject = canvas.getActiveObject()

    if (activeObject.get('type') == "text") {
        enableTextMethods()
        $('#text').val(activeObject.text)
        $('#cp-text').colorpicker('setValue', activeObject.fill)
        $('#font-family').val(activeObject.fontFamily).selectpicker('refresh')
        $('#font-size').val(activeObject.fontSize)
        $('#bold').attr('data', activeObject.fontWeight).trigger('update-status')
        $('#italic').attr('data', activeObject.fontStyle).trigger('update-status')
        $('#underline').attr('data', activeObject.underline).trigger('update-status')
        $(`input[value="${activeObject.textAlign}"]`).parent().trigger('update-status')
        $('#cp-stroke').colorpicker('setValue', activeObject.stroke)
        $('#stroke-width').val(activeObject.strokeWidth)
        $('#shadow-depth').val(activeObject.shadow.blur)
        $('#cp-shadow').colorpicker('setValue', activeObject.shadow.color)
        $('#bg-option').attr('data', activeObject.textBackgroundColor).trigger('update-status')
        $('#cp-background').colorpicker('setValue', activeObject.textBackgroundColor)
    } else {
        // Disable text methods when select an image
        disableTextMethods()
    }

    $('#opacity').val(parseInt(activeObject.opacity * 100))
    $('#scale').val(parseFloat(activeObject.scaleX))
}


function loadObjectHandlers() {
    // Interactive edit methods with canvas text 
    $('#text').off('input').on('input', function () {
        setValue("text", $(this).val())
    })

    $('#scale').off('input').on('input', function () {
        if (canvas.getActiveObject() != null) {
            var activeText = canvas.getActiveObject()
            activeText.scale(parseFloat(this.value)).setCoords();
            canvas.renderAll();
        }
    })

    $('#cp-text').off('colorpickerChange').on('colorpickerChange', function () {
        setValue("fill", $(this).colorpicker('getValue'))
    })

    $('#font-family').off('change').on('change', function () {
        $('#font-family').selectpicker('refresh')
        if (canvas.getActiveObject() != null) {
            loadFont($(this).find(":selected").attr('value'))
        }
    })

    $('#font-size').off('input').on('input', function () {
        setValue("fontSize", $(this).val())
    })

    $('#bold').off('change-value').on('change-value', function () {
        setValue("fontWeight", $(this).attr('data'))
    })

    $('#italic').off('change-value').on('change-value', function () {
        setValue("fontStyle", $(this).attr('data'))
    })

    $('#underline').off('change-value').on('change-value', function () {
        setValue("underline", $(this).attr('data'))
    })

    $('input[name="align"]').off('change').on('change', function () {
        setValue("textAlign", $(this).attr('id'))
    })

    $('#cp-stroke').off('colorpickerChange').on('colorpickerChange', function () {
        setValue("stroke", $(this).colorpicker('getValue'))
    })

    $('#stroke-width').off('input').on('input', function () {
        if ($(this).val() == 0) {
            $(this).val(null)
        }
        setValue("strokeWidth", $(this).val())
    })

    $('#cp-shadow').off('colorpickerChange').on('colorpickerChange', function () {
        setValue("shadow", createShadow($('#cp-shadow').colorpicker('getValue'), $('#shadow-depth').val()))
    })

    $('#shadow-depth').off('input').on('input', function () {
        setValue("shadow", createShadow($('#cp-shadow').colorpicker('getValue'), $('#shadow-depth').val()))
    })

    $('#bg-option').off('click').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            setBackgroundColor('')
        } else {
            $(this).addClass('active')
            setBackgroundColor($('#cp-background').colorpicker('getValue'))
        }
    })

    $('#cp-background').off('colorpickerChange').on('colorpickerChange', function () {
        setBackgroundColor($('#cp-background').colorpicker('getValue'))
    })

    $('#opacity').off('input').on('input', function () {
        setValue("opacity", parseFloat($(this).val() / 100))
    })
}

/*****************************
 * Handle edit buttons style *
*****************************/

// Update style of font-style buttons
$('.edit-btn').on('update-status', function () {
    if ($(this).attr('data') == '') {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active')
    }
})

//  Toggle font-style buttons
$('#font-style .btn').on('click', function () {
    if ($(this).attr('data') == '') {
        $(this).addClass('active')
        $(this).attr('data', $(this).attr('value'))
    } else {
        $(this).removeClass('active')
        $(this).attr('data', '')
    }
    $(this).trigger('change-value')
})

// Update style of text align buttons
$('.align').on('update-status', function () {
    $('.align').removeClass('active')
    $(this).addClass('active')
})