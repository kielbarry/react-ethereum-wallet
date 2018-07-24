import React from 'react'

export const PageHeader = ({ title }) => {
	return (
		<h1>
			{
				title.map(t =>(t.strong ? (<strong>{ t.text } </strong>) : t.text ))
			}
		</h1>
	);
}

export default PageHeader