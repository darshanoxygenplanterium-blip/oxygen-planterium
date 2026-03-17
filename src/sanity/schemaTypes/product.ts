import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Plants',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plant Name',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Plant Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
  name: 'category',
  title: 'Category',
  type: 'string',
  options: {
    list: [
      { title: 'Indoor', value: 'indoor' },
      { title: 'Outdoor', value: 'outdoor' },
      { title: 'Flowering', value: 'flowering' },
      { title: 'Fruiting', value: 'fruiting' },
    ],
  },
}),
  ],
})
