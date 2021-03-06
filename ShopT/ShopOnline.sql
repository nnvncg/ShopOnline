USE [master]
GO
/****** Object:  Database [ShopOnline]    Script Date: 2/18/2018 8:40:05 PM ******/
CREATE DATABASE [ShopOnline]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ShopOnline', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\ShopOnline.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ShopOnline_log', FILENAME = N'c:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\ShopOnline_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ShopOnline] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ShopOnline].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ShopOnline] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ShopOnline] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ShopOnline] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ShopOnline] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ShopOnline] SET ARITHABORT OFF 
GO
ALTER DATABASE [ShopOnline] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ShopOnline] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [ShopOnline] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ShopOnline] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ShopOnline] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ShopOnline] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ShopOnline] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ShopOnline] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ShopOnline] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ShopOnline] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ShopOnline] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ShopOnline] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ShopOnline] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ShopOnline] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ShopOnline] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ShopOnline] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ShopOnline] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ShopOnline] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ShopOnline] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ShopOnline] SET  MULTI_USER 
GO
ALTER DATABASE [ShopOnline] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ShopOnline] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ShopOnline] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ShopOnline] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [ShopOnline]
GO
/****** Object:  Table [dbo].[Bill]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bill](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TradingCode] [nchar](10) NULL,
	[TotalMoney] [float] NULL,
	[CreateDate] [datetime] NULL,
	[Seen] [bit] NULL,
	[Status] [int] NULL,
	[Creator] [int] NULL,
 CONSTRAINT [PK_Bill] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[BillDetail]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BillDetail](
	[IdBill] [int] NOT NULL,
	[IdProduct] [int] NOT NULL,
	[Quantity] [int] NULL,
	[Price] [float] NULL,
 CONSTRAINT [PK_BillDetail] PRIMARY KEY CLUSTERED 
(
	[IdBill] ASC,
	[IdProduct] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Category]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NameCategory] [nvarchar](500) NULL,
	[Detail] [nvarchar](max) NULL,
	[Creator] [int] NULL,
	[Active] [bit] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Comment]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Comment] [nvarchar](max) NULL,
	[Seem] [bit] NULL,
	[Creator] [int] NULL,
	[Product] [int] NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Contact]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Content] [nvarchar](max) NULL,
	[Status] [bit] NULL,
	[Email] [nvarchar](250) NULL,
	[Name] [nvarchar](500) NULL,
	[CreateDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Decentralization]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Decentralization](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
 CONSTRAINT [PK_Decentralization] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MenuList]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuList](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[MenuName] [nvarchar](50) NULL,
	[URLMenu] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [int] NULL,
 CONSTRAINT [PK_MenuList] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Product]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](500) NULL,
	[Category] [int] NULL,
	[Detail] [nvarchar](max) NULL,
	[Source] [nvarchar](500) NULL,
	[SourceDetail] [nvarchar](max) NULL,
	[ShelfLife] [datetime] NULL,
	[Quantity] [int] NULL,
	[Image] [nvarchar](500) NULL,
	[Price] [float] NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [int] NULL,
	[Active] [bit] NULL,
	[CountOrder] [int] NOT NULL,
 CONSTRAINT [PK_Produce] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ShopInformation]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ShopInformation](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NameShop] [nvarchar](500) NULL,
	[IconShop] [nvarchar](500) NULL,
	[AddressShop] [nvarchar](500) NULL,
	[About] [nvarchar](max) NULL,
	[Phone] [nchar](15) NULL,
	[Phone2] [nchar](15) NULL,
	[BankAcc] [nchar](50) NULL,
	[Email] [nvarchar](500) NULL,
	[FaceBook] [nvarchar](500) NULL,
	[Google] [nvarchar](500) NULL,
	[Zalo] [nvarchar](500) NULL,
	[URLMap] [nvarchar](1000) NULL,
	[Keywords] [nvarchar](100) NULL,
 CONSTRAINT [PK_ShopInformation] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Slider]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Slider](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Content] [ntext] NULL,
	[Image] [nvarchar](500) NULL,
	[Order] [int] NULL,
	[Title] [nvarchar](200) NULL,
	[Active] [bit] NULL,
	[Creater] [int] NULL,
	[DateCreate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[StatusBill]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StatusBill](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NameStatusBill] [nvarchar](50) NULL,
	[InformationStatus] [nvarchar](max) NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [int] NULL,
 CONSTRAINT [PK_StatusBill] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[User]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](250) NULL,
	[LastName] [nvarchar](250) NULL,
	[Phone] [char](11) NULL,
	[Email] [nvarchar](250) NULL,
	[Image] [nvarchar](250) NULL,
	[Password] [nchar](50) NULL,
	[Addess] [nvarchar](500) NULL,
	[TypeAcc] [int] NULL,
	[CreateDate] [datetime] NULL,
	[Active] [bit] NULL,
	[CodeReset] [int] NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UserGroup]    Script Date: 2/18/2018 8:40:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGroup](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NameType] [nvarchar](50) NULL,
	[Active] [bit] NULL,
	[CreateDate] [datetime] NULL,
	[Creator] [int] NULL,
	[Authorities] [nchar](500) NULL,
 CONSTRAINT [PK_TypeAccount] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Bill] ON 

INSERT [dbo].[Bill] ([ID], [TradingCode], [TotalMoney], [CreateDate], [Seen], [Status], [Creator]) VALUES (2, N'123454324 ', 123454324, CAST(0x0000A7A900000000 AS DateTime), 1, 2, 1)
SET IDENTITY_INSERT [dbo].[Bill] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([ID], [NameCategory], [Detail], [Creator], [Active]) VALUES (1, N'Mon an', NULL, 1, 1)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Comment] ON 

INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (1, N'Cras sit amet nibh libero, in gravida nulla.1', 1, 1, 4, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (3, N'Cras sit amet nibh libero, in gravida nulla.3', 1, 1, 4, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (4, N'Cras sit amet nibh libero, in gravida nulla.4', 1, 9, 4, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (32, N'congzxcvbn', 1, 1, 10, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (33, N'cong test', 1, 1, 10, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (34, N'test lan n', 1, 9, 10, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (35, N'test lần n', 1, 1, 9, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (36, N'binh luan', 1, 9, 9, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (37, N'12345678', 1, 1, 8, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (38, N'cong', 1, 9, 10, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (39, N'fgdhgfbvcg', 1, 1, 5, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (40, N'fgdhgfbvcg', 1, 1, 5, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (41, N'fgdhgfbvcg', 1, 9, 5, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (42, N'dgfthjke', 1, 9, 4, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (43, N'ytfyuu', 1, 1, 6, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (44, N'1234', NULL, 1, 4, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (45, N'món ăn ngon lắm', 0, 1, 7, CAST(0x0000A71900000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (50, N'mo mo', 0, 1, 1, CAST(0x0000A88600000000 AS DateTime))
INSERT [dbo].[Comment] ([ID], [Comment], [Seem], [Creator], [Product], [CreateDate]) VALUES (51, N'thử bình luận', 0, 1, 7, CAST(0x0000A88600D9CB60 AS DateTime))
SET IDENTITY_INSERT [dbo].[Comment] OFF
SET IDENTITY_INSERT [dbo].[Contact] ON 

INSERT [dbo].[Contact] ([ID], [Content], [Status], [Email], [Name], [CreateDate]) VALUES (1, N'qwe', 1, N'Congnvctk37@gmail.com', N'qwe', CAST(0x0000A87B00000000 AS DateTime))
INSERT [dbo].[Contact] ([ID], [Content], [Status], [Email], [Name], [CreateDate]) VALUES (2, N'tế', 1, N'Congnvctk37@gmail.com', N'test', CAST(0x0000A87B00000000 AS DateTime))
INSERT [dbo].[Contact] ([ID], [Content], [Status], [Email], [Name], [CreateDate]) VALUES (3, N'teet', 1, N'Congnvctk37@gmail.com', N'test', CAST(0x0000A87B00000000 AS DateTime))
INSERT [dbo].[Contact] ([ID], [Content], [Status], [Email], [Name], [CreateDate]) VALUES (4, N'te', 1, N'Congnvctk37@gmail.com', N'te', CAST(0x0000A87B00000000 AS DateTime))
INSERT [dbo].[Contact] ([ID], [Content], [Status], [Email], [Name], [CreateDate]) VALUES (5, N'test', 1, N'Congnvctk37@gmail.com', N'te', CAST(0x0000A87B00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Contact] OFF
SET IDENTITY_INSERT [dbo].[Decentralization] ON 

INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (1, N'Tất cả')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (3, N'Sửa hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (4, N'Xóa hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (5, N'Xem danh sách menu')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (6, N'Sửa menu')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (7, N'Xóa menu')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (8, N'Thêm menu')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (9, N'Thêm loại sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (10, N'Xóa loại sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (11, N'Sửa loại sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (12, N'Xem danh sách bình luận')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (13, N'Xóa bình luận')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (14, N'Xem các liên hệ')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (15, N'Xóa liên hệ')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (16, N'Trả lời liên hệ')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (17, N'Xem thông tin Web')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (18, N'Sửa thông tin Web')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (19, N'Xem sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (20, N'Xóa sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (21, N'Sửa sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (22, N'Thêm sản phẩm')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (23, N'Thêm tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (24, N'Xem danh sách tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (25, N'Kích hoạt tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (26, N'Xem nhóm tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (27, N'Sửa nhóm tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (28, N'Xóa nhóm tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (29, N'Kích hoạt nhóm tài khoản')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (30, N'Sửa danh sách Slider')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (31, N'Thêm tình trạng hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (32, N'Xem tình trạng hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (33, N'Xóa tình trạng hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (34, N'Sửa tình trạng hóa đơn')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (35, N'Xem danh sách Slide')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (36, N'Thêm Slide')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (37, N'Xóa Slide')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (38, N'Xem danh sách bình luận')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (39, N'Quản lý phản hồi bình luân')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (40, N'Xóa bình luận')
INSERT [dbo].[Decentralization] ([ID], [Name]) VALUES (41, N'Thêm nhóm tài khoản')
SET IDENTITY_INSERT [dbo].[Decentralization] OFF
SET IDENTITY_INSERT [dbo].[MenuList] ON 

INSERT [dbo].[MenuList] ([ID], [MenuName], [URLMenu], [Order], [CreateDate], [Creator]) VALUES (1, N'Trang chủ', N'/Home', 1, CAST(0x0000A86200000000 AS DateTime), 1)
INSERT [dbo].[MenuList] ([ID], [MenuName], [URLMenu], [Order], [CreateDate], [Creator]) VALUES (2, N'Liên hệ', N'/Contact', 3, CAST(0x0000A86200000000 AS DateTime), 1)
INSERT [dbo].[MenuList] ([ID], [MenuName], [URLMenu], [Order], [CreateDate], [Creator]) VALUES (4, N'Sản phẩm', N'/Products', 2, CAST(0x0000A88200000000 AS DateTime), 1)
INSERT [dbo].[MenuList] ([ID], [MenuName], [URLMenu], [Order], [CreateDate], [Creator]) VALUES (13, N'Đơn hàng', N'/Order', 4, CAST(0x0000A87600B41E37 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[MenuList] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (2, N'Otoro(Bụng cá ngừ)', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D7226 AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (3, N'sushi trứng cá hồi', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (4, N'sushi thịt cá hồi', 1, N'Có nhiều cách kết hợp để ra một món sushi hoàn chỉnh. Trong đó số đó, sự kết hợp tài tình của vị tươi ngon của cá hồi cùng vị béo của bơ sáp sẽ luôn làm mọi người thích thú với món sushi các hồi. ', NULL, NULL, NULL, 78, N'/Content/img/MonAn/cach-lam-sushi-ca-hoi12.jpg', 120000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 23)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (5, N'san pham 1', 1, NULL, N'test', NULL, NULL, 11, N'/Content/img/MonAn/551228_758653_782525127.jpg', 120000, CAST(0x0000A88500892C68 AS DateTime), 1, 1, 7)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (6, N'sushi thịt cá hồi2', 1, NULL, NULL, NULL, NULL, 12, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 120000, CAST(0x0000A88500892C68 AS DateTime), 1, 1, 14)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (7, N'sushi thịt cá hồi3', 1, NULL, NULL, NULL, NULL, 33, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 120000, CAST(0x0000A88500892C68 AS DateTime), 1, 1, 2)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (8, N'Otoro(Bụng cá ngừ)1', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 4)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (9, N'sushi trứng cá hồi1', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 6)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (10, N'Otoro(Bụng cá ngừ)2', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 5)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (11, N'sushi trứng cá hồi2', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 5)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (12, N'Otoro(Bụng cá ngừ)3', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 5)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (13, N'sushi trứng cá hồi3', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 3)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (14, N'Otoro(Bụng cá ngừ)4', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 9)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (15, N'sushi trứng cá hồi4', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 4)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (16, N'Otoro(Bụng cá ngừ)5', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (17, N'sushi trứng cá hồi5', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (18, N'Otoro(Bụng cá ngừ)6', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (19, N'sushi trứng cá hồi6', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (20, N'Otoro(Bụng cá ngừ)7', 1, NULL, NULL, NULL, NULL, 23, N'/Content/img/MonAn/551228_758653_782525127.jpg', 110000, CAST(0x0000A875000D71CC AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (21, N'sushi trứng cá hồi7', 1, N'Loài cá hồi (tự nhiên) vốn là một loại cá quý, ngon và được ưa chuộng trên khắp thế giới. Cũng như thịt cá hồi, trứng của loài cá này cũng chứa hàm lượng dinh dưỡng rất cao. Việc tách trứng khỏi cá hồi, chế biến và bảo quản vô cùng khắt khe.', NULL, NULL, NULL, 45, N'/Content/img/MonAn/sushi-trung-ca-hoi.jpg', 300000, CAST(0x0000A86200000000 AS DateTime), 1, 1, 0)
INSERT [dbo].[Product] ([ID], [ProductName], [Category], [Detail], [Source], [SourceDetail], [ShelfLife], [Quantity], [Image], [Price], [CreateDate], [Creator], [Active], [CountOrder]) VALUES (22, N'sushi trứng cá hồi7', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[ShopInformation] ON 

INSERT [dbo].[ShopInformation] ([ID], [NameShop], [IconShop], [AddressShop], [About], [Phone], [Phone2], [BankAcc], [Email], [FaceBook], [Google], [Zalo], [URLMap], [Keywords]) VALUES (1, N'GANEYA Nhật Bản', N'/Content/img/favicon.ico', N'5A Đào Duy Từ, Phường 4, Tp. Đà Lạt', N'<p>Website <strong>bán hàng</strong></p>
', N'01673940628    ', N'01673940628    ', N'123456321312                                      ', N'1@gmail.com', NULL, NULL, NULL, N'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7807.216779458402!2d108.44038877252196!3d11.932318446539051!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31711330ef5a053d%3A0xaa09a3a527fe896a!2sKhu+Vui+Ch%C6%A1i+Crazy+Wave!5e0!3m2!1svi!2sin!4v1517418639821', NULL)
SET IDENTITY_INSERT [dbo].[ShopInformation] OFF
SET IDENTITY_INSERT [dbo].[Slider] ON 

INSERT [dbo].[Slider] ([Id], [Name], [Content], [Image], [Order], [Title], [Active], [Creater], [DateCreate]) VALUES (1, N'Khuyen mai', NULL, N'/Content/img/MonAn/KhuyenMai-Sukien/Khuyenmai.jpg', 2, N'Test 1', 1, 1, CAST(0x0000A86200000000 AS DateTime))
INSERT [dbo].[Slider] ([Id], [Name], [Content], [Image], [Order], [Title], [Active], [Creater], [DateCreate]) VALUES (2, N'Su kien', NULL, N'/Content/img/MonAn/KhuyenMai-Sukien/Sukien1.jpg', 3, N'Test2', 1, 1, CAST(0x0000A86200000000 AS DateTime))
INSERT [dbo].[Slider] ([Id], [Name], [Content], [Image], [Order], [Title], [Active], [Creater], [DateCreate]) VALUES (3, N'Test 3', NULL, N'/Content/img/MonAn/KhuyenMai-SuKien/Khuyenmai.jpg', 1, N'ttet3', 1, 1, CAST(0x0000A86200000000 AS DateTime))
INSERT [dbo].[Slider] ([Id], [Name], [Content], [Image], [Order], [Title], [Active], [Creater], [DateCreate]) VALUES (4, N'Test 4', NULL, N'/Content/img/MonAn/KhuyenMai-SuKien/Sukien1.jpg', 4, N'teset4', 1, 1, CAST(0x0000A86200000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Slider] OFF
SET IDENTITY_INSERT [dbo].[StatusBill] ON 

INSERT [dbo].[StatusBill] ([ID], [NameStatusBill], [InformationStatus], [CreateDate], [Creator]) VALUES (1, N'Đã giao', N'Đã giao các mặt hàng cho khách', CAST(0x0000A86700000000 AS DateTime), 1)
INSERT [dbo].[StatusBill] ([ID], [NameStatusBill], [InformationStatus], [CreateDate], [Creator]) VALUES (2, N'Đang giao', N'Đang giao', CAST(0x0000A86700000000 AS DateTime), 1)
INSERT [dbo].[StatusBill] ([ID], [NameStatusBill], [InformationStatus], [CreateDate], [Creator]) VALUES (4, N'Trả hàng', N'không có người nhận', CAST(0x0000A87700B5F3E6 AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[StatusBill] OFF
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([ID], [FirstName], [LastName], [Phone], [Email], [Image], [Password], [Addess], [TypeAcc], [CreateDate], [Active], [CodeReset]) VALUES (1, N'Nguyễn', N'Văn công', N'012345678  ', N'1@gmail.com', N'/Content/img/TaiKhoan/152c3fd6-e684-4b11-a0b7-185b0774e9fb.jpg', N'fcea920f7412b5da7be0cf42b8c93759                  ', N'phù đổng thiên vương- đà lạt', 1, CAST(0x0000A86200000000 AS DateTime), 1, NULL)
INSERT [dbo].[User] ([ID], [FirstName], [LastName], [Phone], [Email], [Image], [Password], [Addess], [TypeAcc], [CreateDate], [Active], [CodeReset]) VALUES (9, N'tran', N't', NULL, N'4@gmail.com', N'/Content/img/TaiKhoan/hinhdd.jpg', N'c20ad4d76fe97759aa27a0c99bff6710                  ', NULL, 6, CAST(0x0000A86D00E2A808 AS DateTime), 1, NULL)
SET IDENTITY_INSERT [dbo].[User] OFF
SET IDENTITY_INSERT [dbo].[UserGroup] ON 

INSERT [dbo].[UserGroup] ([ID], [NameType], [Active], [CreateDate], [Creator], [Authorities]) VALUES (1, N'Quản lý', 1, CAST(0x0000A86200000000 AS DateTime), NULL, N'-1-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ')
INSERT [dbo].[UserGroup] ([ID], [NameType], [Active], [CreateDate], [Creator], [Authorities]) VALUES (2, N'Nhân viên', 0, CAST(0x0000A87F01680D5E AS DateTime), 1, N'-2-4-7-3-0-6-0-10-0-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ')
INSERT [dbo].[UserGroup] ([ID], [NameType], [Active], [CreateDate], [Creator], [Authorities]) VALUES (4, N'Khách hàng', 1, CAST(0x0000A86200000000 AS DateTime), 1, N'-0-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                0                                ')
INSERT [dbo].[UserGroup] ([ID], [NameType], [Active], [CreateDate], [Creator], [Authorities]) VALUES (6, N'test', 1, CAST(0x0000A8810162DB98 AS DateTime), 1, N'-4-3-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ')
SET IDENTITY_INSERT [dbo].[UserGroup] OFF
ALTER TABLE [dbo].[Product] ADD  CONSTRAINT [DF_Product_CountOrder]  DEFAULT ((0)) FOR [CountOrder]
GO
ALTER TABLE [dbo].[Bill]  WITH CHECK ADD  CONSTRAINT [FK_Bill_StatusBill] FOREIGN KEY([Status])
REFERENCES [dbo].[StatusBill] ([ID])
GO
ALTER TABLE [dbo].[Bill] CHECK CONSTRAINT [FK_Bill_StatusBill]
GO
ALTER TABLE [dbo].[BillDetail]  WITH CHECK ADD  CONSTRAINT [FK_BillDetail_Bill] FOREIGN KEY([IdBill])
REFERENCES [dbo].[Bill] ([ID])
GO
ALTER TABLE [dbo].[BillDetail] CHECK CONSTRAINT [FK_BillDetail_Bill]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserGroup] FOREIGN KEY([TypeAcc])
REFERENCES [dbo].[UserGroup] ([ID])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_UserGroup]
GO
USE [master]
GO
ALTER DATABASE [ShopOnline] SET  READ_WRITE 
GO
