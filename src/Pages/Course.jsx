import  { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setCourseThunk } from '../features/course/courseSlice'
import '../style/courses.css'
import CardCourse from '../Components/CardCourse'
import { setIsLoading } from '../features/isLoading/isLoadingSlice'
import IsLoading from '../Components/IsLoading'
import ModalProduct from './ModalProduct'
import { setBalanceThunk } from '../features/balance/balanceSlice'

const Course = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [reload, setReload] = useState(false);

    const handleCardClick = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const dispatch = useDispatch()
    const courses = useSelector(state => state.courses)
    const isLoadingState = useSelector((state) => state.isLoading);

    useEffect(() => {
        dispatch(setBalanceThunk(user.id));
        dispatch(setIsLoading(true));
        dispatch(setCourseThunk())
            .finally(() => {
                dispatch(setIsLoading(false));
            }
            )
    }, [reload])


    return (
        <>
            {isLoadingState ? <IsLoading /> :
               <>
                <div className="container-title">
                <h1>Cursos </h1>
                <p>Encuentra aqui infiniddad de cursos y recursos</p>
                </div>
                <div className='container-course'>
                    {
                        courses.length > 0 ? courses.map((course, index) => <CardCourse course={course} key={index}
                            onClick={() => handleCardClick({ product: course, open: isModalOpen, type: 'course' })}
                        />) : <h1 style={{ color: 'white', textShadow: ' 3px 3px 2px #000000' }}>No hay cursos disponibles </h1>
                    }
                </div>
               </>
}
            {isModalOpen && (
                <ModalProduct
                    data={modalData}
                    onClose={() => setIsModalOpen(false)}
                    reCharge={() => setReload(!reload)}

                />
            )}
        </>
    );
};

export default Course;