import CommonPage from '../../../Molecule/common-page/common-page';
import useDetail from './detail.hooks';


function Detail() {
    const { data } = useDetail();
    console.log(data);
    return (
        <CommonPage
            withBack
            title="Detail"
        >
            <div style={{ columnCount: 2 }}>
                <h3 style={{ fontWeight: 'bold' }}>Detail Information</h3>
                <h3 style={{ fontWeight: 'bold' }}>Cover</h3>
            </div>
            <div style={{ columnCount: 2 }}>
                <div>
                    <div style={{ columnCount: 2, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Title</div>
                            <div>{data?.title}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Author</div>
                            <div>{data?.author}</div>
                        </div>
                    </div>
                    <div style={{ columnCount: 2, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>ISBN</div>
                            <div>{data?.isbn}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Published Year</div>
                            <div>{data?.published_year}</div>
                        </div>
                    </div>
                    <div style={{ columnCount: 2, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Genre</div>
                            <div>{data?.genre}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Total Copies</div>
                            <div>{data?.total_copies}</div>
                        </div>
                    </div>
                    <div style={{ columnCount: 1, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Copies Available</div>
                            <div>{data?.copies_available}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <img
                        src={data?.cover?.url}
                        alt="preview"
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </CommonPage>
    )
}

export default Detail;