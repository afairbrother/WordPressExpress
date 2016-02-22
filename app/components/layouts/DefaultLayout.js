import React from 'react';
import Relay from 'react-relay';
import Page from '../pages/page.js';
import PostContent from '../posts/PostContent';

import CSSModules from 'react-css-modules';
import styles from '../pages/page.scss';

@CSSModules(styles, {allowMultiple: true})
class DefaultLayout extends React.Component{

  render(){
    console.log(this.props);
    const { viewer } = this.props;
    const { post_title, post_content, thumbnail } = viewer.page;

    let bg = {
      backgroundImage: "url('" + thumbnail + "')"
    }

    let heroClass = thumbnail ? "hero_thumbnail" : "hero"

    return(
    	<div>
        <div styleName={heroClass} style={bg}>
					<div styleName="wrapper tight">
            <h2 styleName="title">{post_title}</h2>
					</div>
				</div>

				<div styleName="content">
					<div styleName="wrapper tight">
						<PostContent post_content={post_content}/>
					</div>
				</div>
      </div>
    )
  }
}

export default Relay.createContainer(DefaultLayout, {

  initialVariables:{
    page: null
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        ${ function(){ console.log('default layout query ran') }},
        page(post_name:$page){
          id
          post_title
          post_content
          thumbnail
        },
        settings{
          id
          uploads
          amazonS3
        }
      }
    `
  }

});
