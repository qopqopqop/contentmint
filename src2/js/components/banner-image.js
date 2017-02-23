Cmint.createComponent({
    template: '\
        <a v-if="config._fields.output.link" :href="config._fields.output.link">\
            <img :src="config._fields.output.source" width="100%" \
                 :data-src="config._fields.output.source2" /></a>\
        <img v-else :src="config._fields.output.source" width="100%" \
                    :data-src="config._fields.output.source2" />',
    config: {
        _name: 'banner-image',
        _display: 'Banner Image',
        _category: 'Images',
        _tokens: [
            { 'URL': 'link' },
            { 'FOO': 'foo' },
            { 'SOURCE': 'source' }
        ],
        _fields: {
            output: {
                source: 'http://scoopit.co.nz/static/images/default/placeholder.gif',
                source2: '',
                foo: '',
                link: 'http://scoopit.co.nz/static/images/default/placeholder.gif'
            },
            list: [
                {   name: 'link-mailto',
                    result: 'link'    },
                {   name: 'image-choice',
                    result: 'source'    }
            ]
        }
    }
})