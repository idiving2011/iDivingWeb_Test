Imports System.Web

Public Class ProcMenu
    Inherits Proc

    Public Overloads Shared Function GetInstance(strTableName As String, strFileName As String, strId As String) As Proc
        m_Instance = New ProcMenu(strTableName, strFileName, strId)
        Return m_Instance
    End Function

    Protected Sub New(strTableName As String, strFileName As String, strId As String)
        MyBase.New(strTableName, strFileName, strId)
    End Sub

    Public Overrides Sub Start(dt As DataTable)
        FormExcelReader.ShowMessage("--------------------------")
        FormExcelReader.ShowMessage("開始處理分頁" + m_StrTableName)

        Dim xePage As XElement = CreatePageXml(ReadDatatableToList(dt))
        WriteXmlFile(Nothing, xePage, m_StrFilePath)

        FormExcelReader.ShowMessage("處理分頁結束" + m_StrTableName)
    End Sub

    Protected Overrides Function CreateDefaultXml(aList As Object) As XElement
        Return Nothing
    End Function

    Protected Overrides Function ReadDatatableToList(dt As DataTable) As Object
        Dim listMenu As New List(Of Menu)()

        For Each aRow As DataRow In dt.Rows
            If String.IsNullOrWhiteSpace(GetString(aRow.Item(1))) Then
                Continue For
            End If
            Dim aMenu As New Menu()
            aMenu.Hide = GetBoolean(aRow.Item(0))
            aMenu.MenuText = GetString(aRow.Item(1))
            aMenu.GroupText = GetString(aRow.Item(2))
            aMenu.ItemText = HttpUtility.HtmlDecode(GetString(aRow.Item(3)))
            aMenu.Href = GetString(aRow.Item(4))
            aMenu.Anchor = GetString(aRow.Item(5))
            aMenu.Extra = GetBoolean(aRow.Item(6))
            listMenu.Add(aMenu)
        Next

        Return listMenu
    End Function

    Protected Overrides Function CreatePageXml(aList As Object) As XElement
        Dim MenuList As List(Of Menu) = CType(aList, List(Of Menu))
        Dim xListEle As New XElement("List")

        Dim xMenuPre As New XElement("Menu")
        Dim xGroupPre As New XElement("Group")
        Dim strMenuTextPre As String = "MenuMenu"
        Dim strGroupTextPre As String = "GroupGroup"

        For Each aMenu As Menu In MenuList
            If aMenu.Hide Then
                Continue For
            End If

            Dim xMenu As New XElement("Menu")
            If strMenuTextPre = aMenu.MenuText Then
                xMenu = xMenuPre
            Else
                xMenu.SetAttributeValue("text", aMenu.MenuText)

                xListEle.Add(xMenu)
                xMenuPre = xMenu
                strMenuTextPre = aMenu.MenuText
            End If


            Dim xGroup As New XElement("Group")
            If strGroupTextPre = aMenu.GroupText Then
                xGroup = xGroupPre
            Else
                xGroup.SetAttributeValue("text", aMenu.GroupText)
                If aMenu.Extra Then
                    xGroup.SetAttributeValue("prop", "Extra")
                End If
                xMenu.Add(xGroup)
                xGroupPre = xGroup
                strGroupTextPre = aMenu.GroupText
            End If

            Dim xItem As New XElement("Item")
            xItem.SetAttributeValue("text", aMenu.ItemText)
            xItem.SetAttributeValue("href", aMenu.Href)
            If String.IsNullOrWhiteSpace(aMenu.Anchor) = False Then
                xItem.SetAttributeValue("tag", aMenu.Anchor)
            End If
            xGroup.Add(xItem)


        Next
        Return xListEle
    End Function

    Protected Overrides Function WriteXmlFile(xECurrentFile As XElement, aXE As XElement, strFilePath As String) As String
        If String.IsNullOrWhiteSpace(strFilePath) Then
            Return String.Empty
        End If

        aXE.Save(strFilePath)
        FormExcelReader.ShowMessage("轉檔成功" + strFilePath)
        Return aXE.ToString()
    End Function

End Class