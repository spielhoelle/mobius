import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('create-block/tmy-categories', {
  apiVersion: 2,
  title: 'categories List',
  icon: 'groups',
  category: 'widgets',
  attributes: { categories: { type: 'array', default: [] } },
  edit: Edit,
  save,
});
