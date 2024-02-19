import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType('create-block/tmy-mediacategories', {
  apiVersion: 2,
  title: 'Media categories & tags',
  icon: 'admin-media',
  category: 'widgets',
  edit: Edit,
  save,
});
