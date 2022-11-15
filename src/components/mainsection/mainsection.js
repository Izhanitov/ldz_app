
const Mainsection = () => {
    return (
        <>
            <div className="container first_section">
                <div className="row">
                    <div className="col-5 first_text">
                        <h1>Продукция 
                            <span>из древесины</span>
                        </h1>
                        <span className="przv">Производство в лесосибирске</span>
                        <span className="przv">со складом в Красноярске</span>                        
                        <span className="first_desc">ООО «ЛДЗ» более 12 лет на рынке деревообработки. Производство по полному циклу. От распиловки древесины до готовой продукции. Готовы выполнить поставку качественной продукции в любую точку России.</span>
                    </div>
                    <div className="col-7">
                            <img alt="main img" src="/img/main-img.png" />
                    </div>
                </div>
                <div className="row">
                        <div className="col">
                            <div className="name">
                                Гарантия
                            </div>
                            <div className="text">Мы как производитель уверены в своей продукции и готовы дать гарантию на соответствие наших материалов с фиксацией в договоре.</div>
                        </div>
                        <div className="col">
                            <div className="name">
                                Наличие
                            </div>
                            <div className="text">Мы производим продукцию и складируем ее на своих площадях в Лесосибирске и Красноярске, готовы быстро отгрузить необходимый товар.</div>
                        </div>
                        <div className="col">
                            <div className="name">
                                Оплата
                            </div>
                            <div className="text">Для оптовых покупателей у нас разные условия для работы и возможно получение скидки при объемных заказах.</div>
                        </div>
                        <div className="col">
                            <div className="name">
                                Официально
                            </div>
                            <div className="text">Мы законное предприятие и работаем по договору. Если мы что-то должны, то мы это сделаем без «НО» и «ЕСЛИ».</div>
                        </div>
                    </div>
            </div>
        </>
    );
}

export default Mainsection;