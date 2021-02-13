import React from 'react'
import { Col, Button } from 'shards-react'
import { BeatLoader } from 'react-spinners'

export default function Categories({
  data,
  isActive,
  isLoading,
  handleClickCategory,
}) {
  console.log('datanya ====>', data)
  return (
    <Col>
      {isLoading ? (
        <BeatLoader size={10} margin={2} color={`#007bff`} />
      ) : data && data.length ? (
        <React.Fragment>
          <Button
            pill
            outline
            theme="primary"
            className={`mb-2 mr-1 ${isActive === 'all' ? 'active' : ''}`}
            onClick={() => handleClickCategory('all')}
            style={{ textTransform: 'capitalize' }}
          >
            <i className={`mr-1 fa fa-globe`}></i>
            all
          </Button>
          {data.map((item, idx) => (
            <Button
              pill
              outline
              theme="primary"
              className={`mb-2 mr-1 ${item.id === isActive ? 'active' : ''}`}
              key={String(idx)}
              onClick={() => handleClickCategory(item.id)}
              style={{ textTransform: 'capitalize' }}
            >
              <i className={`mr-1 fa fas ${item.fa_icon}`}></i>
              {item.title}
            </Button>
          ))}
        </React.Fragment>
      ) : null}
    </Col>
  )
}
