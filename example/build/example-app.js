// Default toolbar buttons are save, context, and undo. You'll most likely want to 
// write some kind of ajax request that does something with the data and/or markup
// from your created content. This is a way to add a toolbar button for that thing.
Cmint.createToolbarButton({
    text: 'Get Code',
    btnClasses: { 'toolbar-code':true, 'toolbar-btn-fancy': true },
    iconClasses: { 'fa': true, 'fa-code': true },
    callback: function() {
        if ($('#CodeModal').length === 0) {
            var $codeModal = $('<div id="CodeModal"></div>');
            $codeModal.css({
                'position': 'fixed',
                'top': '40px',
                'bottom': '0',
                'width': '100%',
                'z-index':'8000'
            })
            $codeModal.append('\
                <textarea style="margin:1em;\
                    width:42em;height:22em;\
                    display:block;padding:2em;\
                    border:1px solid #888;\
                    font-family:Consolas;"></textarea>')
            Cmint.Bus.$emit('toggleOverlay', true)
            $('body').append($codeModal);
            $('#CodeModal textarea').text(Cmint.App.markup)
            $('#CodeModal textarea').focus().select();
        } else {
            Cmint.Bus.$emit('toggleOverlay', false)
            $('#CodeModal').remove();
        }
        
    }
})
Cmint.createOnSaveHook(function(data) {
    Cmint.Util.debug('ran onSave hook: send data to back end script');
    console.log(data);
})
// Templates are just some html with a token that stands in place for the main staging
// area. In the place where you want to add components write in {{ stage }}. The path
// is used on page load to run an ajax request for the markup. The components array is
// just a list of components you'd like to make available for that template.
Cmint.createTemplate('email', {
    path: '/example/template-markup/email.html',
    components: ['heading', 'banner-image', 'body-copy', 'button-cta', 'course-table', 'container']
})
Cmint.createMenu('align-block', {
    'Default': '',
    'Center': '0 auto'
})
Cmint.createMenu('bgcolor', {
    'Default': '',
    'Dark': '#cccccc'
})
Cmint.createMenu('image-list', {
    'Default': 'http://placehold.it/800x300',
    'Computer': 'http://www.imakenews.com/rbm/sed_computer.jpg',
    'Dayton Fountain': 'http://www.imakenews.com/rbm/sed_ru_fountain.jpg',
    'Instructor': 'http://www.imakenews.com/rbm/sed_instructor.jpg',
    'Keyboard': 'http://imakenews.com/rbm/sed_keyboard.jpg',
    'Students': 'http://www.imakenews.com/rbm/sed_students.jpg',
    'Mouse': 'http://www.imakenews.com/rbm/sed_mouse.jpg',
    'Cat': 'http://listhogs.com/wp-content/uploads/2016/06/10-14.jpg',
    'Norway': 'https://www.nordicvisitor.com/images/norway/sognefjord-norway.jpg',
    'The Grey': 'https://s-media-cache-ak0.pinimg.com/originals/b4/22/a1/b422a1816328a39b46e193c68df9e456.jpg',
    'YoYo': 'http://mediad.publicbroadcasting.net/p/michigan/files/styles/x_large/public/yoyo_ma_trumpie_12.jpg'
})
Cmint.createMenu('padding', {
    'Default': '',
    'A little': '1em',
    'A lot': '2.5em'
})
// type, display, label, choices[{name}]
Cmint.createField({
    name: 'link-choice',
    config: {
        type: 'field-choice',
        display: 'Link Type',
        label: 'Link Type',
        choices: [
            { name: 'link-url' },
            { name: 'link-mailto' }
        ]
    }
})
Cmint.createField({
    name: 'align-block',
    config: {
        type: 'field-dropdown',
        display: 'Alignment',
        label: 'Alignment',
        input: 'alignblock',
        menu: 'align-block'
    }
})
// type, display, label, input, menu, help*, processes*
Cmint.createField({
    name: 'bgcolor',
    config: {
        type: 'field-dropdown',
        display: 'Background Color',
        label: 'Background Color',
        input: 'bgcolor',
        menu: 'bgcolor'
    }
})
Cmint.createField({
    name: 'image-presets',
    config: {
        type: 'field-dropdown',
        display: 'Preset Images',
        label: 'Image List',
        input: 'selected-image',
        menu: 'image-list'
    }
})
// type, display, label, input, menu, help*, processes*
Cmint.createField({
    name: 'padding',
    config: {
        type: 'field-dropdown',
        display: 'Padding',
        label: 'Padding',
        input: 'padding',
        menu: 'padding'
    }
})
// type, display, label, input[{name, label, type}], processes[], help*
Cmint.createField({
    name: 'link-mailto',
    config: {
        type: 'field-group',
        display: 'Email Link',
        label: 'Email Link',
        processes: ['mailto'],
        input: [
            { name: 'to', 
              label: 'The email sendee', 
              type: 'input' },
            { name: 'subject', 
              label: 'The email subject line', 
              type: 'input' },
            { name: 'body', 
              label: 'The body of your email', 
              type: 'textarea' }
        ],
    }
})
Cmint.createField({
    name: 'bg-color',
    config: {
        type: 'field-text',
        display: 'Background Color',
        label: 'Background Color',
        input: 'bg',
        help: 'Any valid CSS color value'
    }
})
// type, display, label, input, help*, check*, processes*
Cmint.createField({
    name: 'color',
    config: {
        type: 'field-text',
        display: 'Color',
        label: 'Color',
        input: 'color',
        help: 'Any valid CSS color value'
    }
})
Cmint.createField({
    name: 'max-width',
    config: {
        type: 'field-text',
        display: 'Max Width',
        label: 'Max Width',
        input: 'maxwidth',
        help: 'add "px" to the end for pixels'
    }
})
// type, display, label, input, help*, check*, processes*
Cmint.createField({
    name: 'plaintext',
    config: {
        type: 'field-text',
        display: 'Content Text',
        label: 'Content Text',
        input: 'content-text'
    }
})
Cmint.createField({
    name: 'link-url',
    config: {
        type: 'field-text',
        display: 'Link URL',
        label: 'Link URL',
        input: 'link',
        help: 'Absolute path including http(s)://',
        check: /^https*:\/\/.+/g,
    }
})
// Editor post processes are to the editor instance markup what component hooks are
// to components. Whenever a change occurs in a tinymce editing instance, a postprocess
// hook is run. Tinymce allows you to hook into that process and this is simply a
// wrapper around that feature injecting it into our tinymce implementation.
Cmint.createEditorPostProcess(function(e) {
    $(e.target.bodyElement).find('a').each(function() {
        var attrs = this.attributes;
        if (!attrs.style) {
            this.setAttribute('style', 'color:#0b4b87;');
        } else {
            this.attributes.style = this.attributes.style + 'color:#0b4b87';
        }
        this.setAttribute('target', '_blank');
    })
})
// field-group takes all inputs and the component instance
Cmint.createFieldProcess('mailto', function(inputs, component) {
    var output = 'mailto:';
    output += Cmint.Fields.tokenize(inputs.to.value, component) + '?';
    output += 'Subject=' + encode(Cmint.Fields.tokenize(inputs.subject.value, component)) + '&';
    output += 'Body=' + encode(Cmint.Fields.tokenize(inputs.body.value, component));
    function encode(val) { return encodeURIComponent(val); }
    return output;
})

Cmint.createComponentHook('rgbtohex', 'Global', {

    markup: function(markup, config) {
        var rgbs = markup.match(/rgb\(\d+,\s*\d+,\s*\d+\)/g);
        if (rgbs) {
            rgbs.forEach(function(color) {
                var exp = new RegExp(color.replace(/\(/g,'\\(').replace(/\)/g, '\\)'), 'g');
                var hex = color.replace(/rgb\(/,'').replace(/\)/,'');
                hex = hex.split(', ');
                hex = hex.map(function(val) {
                    val = val * 1;
                    val = val.toString(16);
                    if (val.length === 1) val = '0' + val;
                    return val;
                }).join('');
                markup = markup.replace(exp, '#' + hex)
            })
        }
        config.markup = markup;
    }

})
// You may have situations where you'd like to manipulate a component after it has
// mounted or updated. You may also not want that thing to be the same in the editor
// versus the result. Additionally, you may want a thing to happen across the board for
// all components, or you may want to localize it to specific components when called.
// A component hook can therefore be global (runs on every component) or local (only
// runs if you define it in config). They can also be separate for the 'editing'
// experience and the 'cleanup' phase of the content.
Cmint.createComponentHook('vertical-space', 'Global', {
    editing: function(element) {
        $(element).css({
            'margin-bottom': '16px'
        })
    },
    cleanup: function(element) {
        $(element).css({'margin-bottom': ''})
        $('<br>').insertAfter(element)
        $(element).find('.Component').each(function() {
            $(this).css({'margin-bottom': ''})
            $('<br>').insertAfter(this)
        })
        
    }
})
Cmint.createComponent({
    template: '\
        <comp v-if="config.fields.output.link" :tag="config.tags.link" :config="config" :href="config.fields.output.link" target="_blank" style="display:block">\
            <img :src="config.fields.output.source" :style="config.css" />\
        </comp>\
        <comp v-else :tag="config.tags.image" :config="config" :src="config.fields.output.source" :style="config.css"></comp>',
    config: {
        name: 'banner-image',
        display: 'Banner Image',
        category: 'Images',
        css: {
            'width':'100%',
            'display': 'block',
            'margin':'0 auto'
        },
        tags: {
            image: 'img',
            link: 'a'
        },
        tokens: [
            { 'url': 'link' },
            { 'source': 'source' }
        ],
        fields: {
            output: {
                source: 'http://placehold.it/800x300',
                link: ''
            },
            list: [
                {   name: 'link-choice',
                    result: 'link'      },
                {   name: 'image-presets',
                    result: 'source'    }
            ]
        }
    }
})
Cmint.createComponent({
    template: '<comp :config="config" data-edit="copy" :style="config.css"></comp>',
    config: {
        name: 'body-copy',
        display: 'Body Copy',
        category: 'Content',
        css: {
            'color': '#231f20',
            'line-height': '20px',
            'font-size': '14px',
            'font-family': 'sans-serif',
        },
        content: {
            copy: '<div>This is some default text and I could have used Lorem, but I decided to use this instead. And what is this? It is a rambling, a muse, an attempt to fool you into thinking there is legitimate copy here when there actually isn\'t. And honestly, what is legitimate copy, anyways?</div>'
        }
    }
})
Cmint.createComponent({
    template: '\
        <comp :config="config" cellpadding="0" cellspacing="0" align="center" style="background:#cb4f29">\
            <tr>\
              <td width="20" height="5"></td>\
              <td>&nbsp;</td>\
              <td width="20" height="5"></td>\
            </tr>\
            <tr>\
              <td width="20" height="5"></td>\
              <td>\
                  <div style="font-family:Arial, sans-serif; font-size:14px; font-style:italic; font-weight:bold; text-align:center; line-height:14px;">\
                    <a :href="config.fields.output.href" style="color:#ffffff; text-decoration:none;" v-text="config.fields.output.linktext"></a>\
                  </div>\
                </td>\
              <td width="20" height="5"></td>\
            </tr>\
            <tr>\
              <td width="20" height="5"></td>\
              <td>&nbsp;</td>\
              <td width="20" height="5"></td>\
            </tr>\
        </comp>',
    config: {
        name: 'button-cta',
        display: 'Button',
        category: 'Buttons',
        tags: { root: 'table' },
        fields: {
            output: { href: '#', linktext: 'Button Link Text' },
            list: [
                { name: 'link-choice', result: 'href' },
                { name: 'plaintext', result: 'linktext' }
            ]
        }
    }
})
Cmint.createComponent({
    template: '\
        <comp :config="config" :style="{\
            padding:config.fields.output.padding,\
            \'max-width\': config.fields.output.maxwidth,\
            margin: config.fields.output.centerblock\
        }">\
            <context :contexts="config.contexts.container" data-context="container"></context>\
        </comp>',
    config: {
        name: 'container',
        display: 'Empty Container',
        category: 'Layout',
        contexts: {
            container: []
        },
        fields: {
            output: { padding: '', centerblock:'', maxwidth: '' },
            list: [
                {name: 'padding', result: 'padding'},
                {name: 'align-block', result: 'centerblock' },
                {name: 'max-width', result: 'maxwidth'}
            ]
        }
    }
})
Cmint.createComponent({
    template: '\
        <comp :config="config">\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor" data-edit="platform"></td>\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor" data-edit="date"></td>\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor" data-edit="time"></td>\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor" data-edit="code"></td>\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor" data-edit="name"></td>\
            <td :style="config.css.row" :bgcolor="config.fields.output.bgcolor">\
                <a :href="config.fields.output.register" style="color: rgb(11, 75, 135);">Click Here</a>\
            </td>\
        </comp>',
    config: {
        name: 'course-row',
        display: 'Course Row',
        tags: { root: 'tr' },
        tokens: [
            { 'platform': 'platform' },
            { 'date': 'date' }, 
            { 'time': 'time' },
            { 'code': 'code' },
            { 'name': 'name' },
        ],
        content: {
            platform: 'Contact Management',
            date: '3/6/2017',
            time: '11:00 am',
            name: 'Introduction to Contact Management',
            code: 'CM101'
        },
        css: {
            row: { 
                'text-align': 'center',
                'border': '1px solid #1e201f',
                'font-family': 'sans-serif',
                'font-size': '12px'
            }
        },
        fields: {
            output: { register: '#', bgcolor: '' },
            list: [
                {name: 'link-mailto', result: 'register' },
                {name: 'bgcolor', result: 'bgcolor' }
            ]
        }
    }
})
Cmint.createComponent({
    template: '\
        <comp :config="config" cellspacing="3" cellpadding="3" align="center" width="100%">\
            <tbody>\
                <tr>\
                    <td width="90" :style="config.css.header">Platform</td>\
                    <td width="60" :style="config.css.header">Date</td>\
                    <td width="110" :style="config.css.header">Time (Eastern)</td>\
                    <td width="70" :style="config.css.header">Session Code</td>\
                    <td width="180" :style="config.css.header">Session Name</td>\
                    <td width="90" :style="config.css.header">Enroll Now</td>\
                </tr>\
            </tbody>\
            <context\
                :contexts="config.contexts.rows"\
                :tag="config.tags.rows"\
                :insert="config.tags.insert"\
                data-context="rows">\
            </context>\
            <tbody>\
                <tr>\
                    <td colspan="6" :style="config.css.header">Central Time &ndash; Subtract 1 hour; Mountain &ndash; Subtract 2 Hours; Pacific &ndash; Subtract 3 Hours</td>\
                </tr>\
            </tbody>\
        </comp>',
    config: {
        name: 'course-table',
        display: 'Course Table',
        tags: { 
            root: 'table',
            rows: 'tbody',
            insert: 'tr'
        },
        category: 'Content',
        css: {
            header: { 
                background: '#231f20', 
                color: 'white',
                'font-size': '12px',
                'font-family': 'Arial',
                'text-align': 'center'
            }
        },
        contexts: {
            rows: [{
                name: 'course-row',
                display: 'Course Row',
                tags: { root: 'tr' },
                tokens: [
                    { 'platform': 'platform' },
                    { 'date': 'date' }, 
                    { 'time': 'time' },
                    { 'code': 'code' },
                    { 'name': 'name' }, 
                ],
                content: {
                    platform: 'Contact Management',
                    date: '3/6/2017',
                    time: '11:00 am',
                    name: 'Introduction to Contact Management',
                    code: 'CM101'
                },
                css: {
                    row: { 
                        'text-align': 'center',
                        'border': '1px solid #1e201f',
                        'font-family': 'sans-serif',
                        'font-size': '12px'
                    }
                },
                fields: {
                    output: { register: '#', bgcolor: '' },
                    list: [
                        {name: 'link-mailto', result: 'register' },
                        {name: 'bgcolor', result: 'bgcolor' }
                    ]
                }
            }]
        }
    }
})
Cmint.createComponent({
    template: '\
        <comp :config="config" :style="{\
            background: config.fields.output.bg,\
            padding: config.fields.output.padding,\
            color:config.fields.output.color,\
            \'font-family\': config.css.fontfam,\
            \'font-size\': config.css.fontsize,\
            \'font-weight\': config.css.fontweight,\
            \'line-height\': config.css.lineheight}"\
            data-edit="text">\
        </comp>',
    config: {
        name: 'heading',
        display: 'Heading',
        category: 'Content',
        css: {
            fontfam: 'Arial, sans-serif',
            fontsize: '24px',
            fontweight: 'bold',
            lineheight: 'normal'
        },
        tokens: [{'text': 'text'}, {'bg': 'bg'}],
        content: { 
            text: '<div>Lorem Ipsum Headingum</div>'
        },
        fields: {
            output: { color: '', bg: '', padding: '' },
            list: [
                { name: 'color', result: 'color' },
                { name: 'bg-color', result: 'bg' },
                { name: 'padding', result: 'padding' }
            ]
        }
    }
})