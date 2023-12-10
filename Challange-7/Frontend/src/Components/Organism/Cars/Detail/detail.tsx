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
            <div style={{ columnCount: 2, display: 'flex' }}>
                <h3 style={{ fontWeight: 'bold', width: '50%' }}>Detail Information</h3>
                <h3 style={{ fontWeight: 'bold', width: '50%' }}>Picture</h3>
            </div>
            <div style={{ columnCount: 2 }}>
                <div>
                    <div style={{ columnCount: 2, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Title</div>
                            <div>{data?.title}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Price</div>
                            <div>{data?.price}</div>
                        </div>
                    </div>
                    <div style={{ columnCount: 2, marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Available</div>
                            <div>{data?.available ? 'Yes' : 'No'}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Status</div>
                            <div>{data?.status}</div>
                        </div>
                    </div>
                    <div style={{ columnCount: 2 }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Created By</div>
                            <div>{data?.created_by}</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>Edited By</div>
                            <div>{data?.edited_by == "" ? '-' : data?.edited_by}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <img
                        src={data?.picture}
                        alt="preview"
                        style={{ width: '500px', height: '500px' }}
                    />
                </div>
            </div>
        </CommonPage>
    )
}

export default Detail;