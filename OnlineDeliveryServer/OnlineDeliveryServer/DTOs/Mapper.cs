using AutoMapper;

namespace OnlineDeliveryServer.DTOs
{
    public class Mapper :Profile
    {
		public Mapper()
        {
			//CreateMap<User, UserDto>().ReverseMap(); //Kazemo mu da mapira Subject na SubjectDto i obrnuto
			CreateMap<Order, OrderDto>().ReverseMap();
			CreateMap<OrderItem, OrderItemDto>().ReverseMap();
			CreateMap<User, UserDto>().ReverseMap();
			//CreateMap<Product, ProductDto>().ReverseMap();
			//CreateMap<OrderProduct, OrderProductDto>().ReverseMap();
			//CreateMap<Token, TokenDto>().ReverseMap();
			//CreateMap<List<Product>, List<ProductDto>>().ReverseMap();
			//CreateMap<List<Order>, List<OrderDto>>().ReverseMap();
		}
		

	}
}
